// src/services/cart.service.js
import prisma from "../utils/prisma.js";
import { AppError } from "../middlewares/error.middleware.js";

const cartItemInclude = {
  product: {
    include: {
      images: { take: 1, orderBy: { displayOrder: "asc" } },
      category: { select: { name: true } },
    },
  },
};

export const getCart = async (sessionId) => {
  const items = await prisma.cartItem.findMany({
    where: { sessionId },
    include: cartItemInclude,
    orderBy: { addedAt: "desc" },
  });

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return { items, subtotal: subtotal.toFixed(2) };
};

export const addToCart = async ({ sessionId, productId, quantity, userId }) => {
  // Check product exists and has stock
  const product = await prisma.product.findFirst({
    where: { id: productId, isActive: true },
  });

  if (!product) throw new AppError("Product not found", 404);
  if (product.stockQty < quantity) {
    throw new AppError(`Only ${product.stockQty} units available`, 400);
  }

  // Upsert — if already in cart, increase quantity
  const existing = await prisma.cartItem.findFirst({
    where: { sessionId, productId },
  });

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (product.stockQty < newQty) {
      throw new AppError(`Only ${product.stockQty} units available`, 400);
    }
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty },
      include: cartItemInclude,
    });
  }

  return prisma.cartItem.create({
    data: { sessionId, productId, quantity, userId: userId || null },
    include: cartItemInclude,
  });
};

export const updateCartItem = async (itemId, quantity) => {
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { product: true },
  });

  if (!item) throw new AppError("Cart item not found", 404);
  if (item.product.stockQty < quantity) {
    throw new AppError(`Only ${item.product.stockQty} units available`, 400);
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: cartItemInclude,
  });
};

export const removeCartItem = async (itemId) => {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item) throw new AppError("Cart item not found", 404);
  await prisma.cartItem.delete({ where: { id: itemId } });
};

export const clearCart = async (sessionId) => {
  await prisma.cartItem.deleteMany({ where: { sessionId } });
};