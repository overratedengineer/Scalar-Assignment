// src/services/order.service.js
import prisma from "../utils/prisma.js";
import { AppError } from "../middlewares/error.middleware.js";

const generateOrderNumber = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FK${ts}${rand}`;
};

export const placeOrder = async ({ sessionId, address, userId }) => {
  // ── ACID transaction — all-or-nothing ────────────────────────────────────────
  return prisma.$transaction(async (tx) => {
    // 1. Fetch cart items
    const cartItems = await tx.cartItem.findMany({
      where: { sessionId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    // 2. Stock check — fail fast before writing anything
    for (const item of cartItems) {
      if (!item.product.isActive) {
        throw new AppError(`Product "${item.product.name}" is no longer available`, 409);
      }
      if (item.product.stockQty < item.quantity) {
        throw new AppError(
          `Insufficient stock for "${item.product.name}". Available: ${item.product.stockQty}`,
          409
        );
      }
    }

    // 3. Create address (stored per-order for snapshot integrity)
    const savedAddress = await tx.address.create({
      data: {
        ...address,
        userId: userId || null,
      },
    });

    // 4. Calculate totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
    const shippingFee = subtotal >= 500 ? 0 : 40;
    const total = subtotal + shippingFee;

    // 5. Create order
    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: userId || null,
        addressId: savedAddress.id,
        subtotal,
        shippingFee,
        total,
        status: "PLACED",
      },
    });

    // 6. Insert order items (price snapshot)
    await tx.orderItem.createMany({
      data: cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.product.name,     // ← snapshot
        productPrice: item.product.price,   // ← snapshot
        quantity: item.quantity,
        lineTotal: Number(item.product.price) * item.quantity,
      })),
    });

    // 7. Decrement stock for each product
    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockQty: { decrement: item.quantity } },
      });
    }

    // 8. Clear cart
    await tx.cartItem.deleteMany({ where: { sessionId } });

    // 9. Return full order detail
    return tx.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: true,
        address: true,
      },
    });
  }); // commit — only if all steps succeed
};

export const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: { take: 1, orderBy: { displayOrder: "asc" } } },
          },
        },
      },
      address: true,
    },
  });
};

export const getOrdersBySession = async (sessionId) => {
  // Orders are tied to user or session — for guest users we match by address
  // This is simplified; production would use userId
  return prisma.order.findMany({
    where: { userId: null }, // extend with session tracking if needed
    include: { orderItems: true },
    orderBy: { placedAt: "desc" },
    take: 10,
  });
};

export const getOrdersByUser = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: { take: 1, orderBy: { displayOrder: "asc" } } },
          },
        },
      },
      address: true,
    },
    orderBy: { placedAt: "desc" },
  });
};