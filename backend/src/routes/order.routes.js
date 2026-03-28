import { Router } from 'express';
import { prisma } from '../index.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

// ────────────────────────────────────────────
// POST /api/orders — Place order from cart
// ────────────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ status: 'error', message: 'Shipping address is required' });
    }

    // 1. Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Cart is empty. Add items before placing an order.' });
    }

    // 2. ✅ Stock validation for every item in cart
    for (const item of cartItems) {
      if (item.product.stockQty <= 0) {
        return res.status(400).json({
          status: 'error',
          message: `"${item.product.name}" is out of stock. Please remove it from your cart.`
        });
      }
      if (item.quantity > item.product.stockQty) {
        return res.status(400).json({
          status: 'error',
          message: `Only ${item.product.stockQty} units of "${item.product.name}" available. You requested ${item.quantity}.`
        });
      }
    }

    // 3. Calculate total: total = sum(product.price × quantity)
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

    // 4. Atomic transaction: create order → decrement stock → clear cart
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: req.userId,
          shippingAddress,
          totalAmount,
          status: 'PROCESSING',
          items: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        },
        include: { items: { include: { product: true } } }
      });

      // Decrement stock for each product
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: { decrement: item.quantity } }
        });
      }

      // Clear the user's cart after successful order
      await tx.cartItem.deleteMany({
        where: { userId: req.userId }
      });

      return newOrder;
    });

    res.status(201).json({ status: 'success', data: order, message: 'Order placed successfully' });
  } catch (error) {
    next(error);
  }
});

// ────────────────────────────────────────────
// POST /api/orders/buy-now — Buy Now (skip cart)
// ────────────────────────────────────────────
router.post('/buy-now', async (req, res, next) => {
  try {
    const { productId, quantity = 1, shippingAddress } = req.body;

    if (!productId || !shippingAddress) {
      return res.status(400).json({ status: 'error', message: 'productId and shippingAddress are required' });
    }
    if (quantity < 1) {
      return res.status(400).json({ status: 'error', message: 'Quantity must be at least 1' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });

    // ✅ Stock validation
    if (product.stockQty <= 0) {
      return res.status(400).json({ status: 'error', message: 'Product is out of stock' });
    }
    if (quantity > product.stockQty) {
      return res.status(400).json({
        status: 'error',
        message: `Only ${product.stockQty} units available in stock`
      });
    }

    // Calculate total
    const totalAmount = product.price * quantity;

    // Atomic transaction: create order → decrement stock
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: req.userId,
          shippingAddress,
          totalAmount,
          status: 'PROCESSING',
          items: {
            create: {
              productId,
              quantity,
              price: product.price
            }
          }
        },
        include: { items: { include: { product: true } } }
      });

      await tx.product.update({
        where: { id: productId },
        data: { stockQty: { decrement: quantity } }
      });

      return newOrder;
    });

    res.status(201).json({ status: 'success', data: order, message: 'Order placed successfully via Buy Now' });
  } catch (error) {
    next(error);
  }
});

// ────────────────────────────────────────────
// GET /api/orders — Order history
// ────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { items: { include: { product: { include: { images: true } } } } },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ status: 'success', data: orders });
  } catch (error) {
    next(error);
  }
});

// ────────────────────────────────────────────
// GET /api/orders/:id — Order confirmation / details
// ────────────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: { include: { images: true } } } } }
    });

    if (!order || order.userId !== req.userId) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }

    res.json({ status: 'success', data: order });
  } catch (error) {
    next(error);
  }
});

export default router;
