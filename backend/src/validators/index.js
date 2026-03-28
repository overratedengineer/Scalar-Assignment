// src/validators/index.js
import { z } from "zod";

export const addToCartSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().min(1).max(20).default(1),
  userId: z.string().uuid().optional(),
});

export const updateCartSchema = z.object({
  quantity: z.number().int().min(1).max(20),
});

export const placeOrderSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  address: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(10).max(10),
    line1: z.string().min(5),
    line2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().length(6),
  }),
  userId: z.string().uuid().optional(),
});

export const productQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  brand: z.string().optional(),
  sortBy: z.enum(["price_asc", "price_desc", "rating", "newest"]).default("newest"),
});