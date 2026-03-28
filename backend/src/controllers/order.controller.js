// src/controllers/order.controller.js
import * as orderService from "../services/order.service.js";
import { placeOrderSchema } from "../validators/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const placeOrder = async (req, res, next) => {
  try {
    const body = placeOrderSchema.parse(req.body);
    const order = await orderService.placeOrder(body);
    sendSuccess(res, order, 201);
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return sendError(res, "Order not found", 404);
    sendSuccess(res, order);
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return sendError(res, "userId is required", 400);
    const orders = await orderService.getOrdersByUser(userId);
    sendSuccess(res, orders);
  } catch (err) {
    next(err);
  }
};