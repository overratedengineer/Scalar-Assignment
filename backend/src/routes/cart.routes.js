import { Router } from 'express';
import { prisma } from '../index.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

// GET cart details with pricing summary
router.get('/', async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: { product: { include: { images: true } } }
    });

    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
    const totalMrp = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.mrp), 0);
    const discount = totalMrp - subtotal;

    res.json({
      status: 'success',
      data: {
        items: cartItems,
        summary: {
          itemCount,
          totalMrp,
          discount,
          subtotal,
          shippingFee: 0, // Free shipping
          total: subtotal,
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST add item to cart (with stock validation)
router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ status: 'error', message: 'productId and quantity (>= 1) are required' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });

    // ✅ Stock validation
    if (product.stockQty <= 0) {
      return res.status(400).json({ status: 'error', message: 'Product is out of stock' });
    }

    // Check existing cart item to validate total quantity against stock
    const existingCartItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: req.userId, productId } }
    });
    const newTotalQty = (existingCartItem?.quantity || 0) + quantity;

    if (newTotalQty > product.stockQty) {
      return res.status(400).json({
        status: 'error',
        message: `Only ${product.stockQty} units available in stock. You already have ${existingCartItem?.quantity || 0} in cart.`
      });
    }

    // Upsert cart item
    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: req.userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId: req.userId, productId, quantity },
    });

    res.status(201).json({ status: 'success', data: cartItem });
  } catch (error) {
    next(error);
  }
});

// PUT update cart item quantity (with stock validation)
router.put('/:id', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.id;

    if (!quantity || quantity < 1) {
       return res.status(400).json({ status: 'error', message: 'Quantity must be at least 1' });
    }

    // Verify ownership
    const existing = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true }
    });
    if (!existing || existing.userId !== req.userId) {
       return res.status(404).json({ status: 'error', message: 'Cart item not found' });
    }

    // ✅ Stock validation
    if (quantity > existing.product.stockQty) {
      return res.status(400).json({
        status: 'error',
        message: `Only ${existing.product.stockQty} units available in stock`
      });
    }

    const updated = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity }
    });

    res.json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE remove item from cart
router.delete('/:id', async (req, res, next) => {
  try {
    const cartItemId = req.params.id;

    const existing = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!existing || existing.userId !== req.userId) {
       return res.status(404).json({ status: 'error', message: 'Cart item not found' });
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    res.json({ status: 'success', message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

export default router;
