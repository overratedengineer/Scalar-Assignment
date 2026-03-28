// src/controllers/cart.controller.js
import * as cartService from "../services/cart.service.js";
import { addToCartSchema, updateCartSchema } from "../validators/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const getCart = async (req, res, next) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return sendError(res, "session_id is required", 400);
    const cart = await cartService.getCart(session_id);
    sendSuccess(res, cart);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const body = addToCartSchema.parse(req.body);
    const item = await cartService.addToCart(body);
    sendSuccess(res, item, 201);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = updateCartSchema.parse(req.body);
    const item = await cartService.updateCartItem(req.params.itemId, quantity);
    sendSuccess(res, item);
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    await cartService.removeCartItem(req.params.itemId);
    sendSuccess(res, { message: "Item removed from cart" });
  } catch (err) {
    next(err);
  }
};