// src/controllers/product.controller.js
import * as productService from "../services/product.service.js";
import { productQuerySchema } from "../validators/index.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const listProducts = async (req, res, next) => {
  try {
    const query = productQuerySchema.parse(req.query);
    const result = await productService.getProducts(query);
    sendSuccess(res, result.products, 200, { pagination: result.pagination });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return sendError(res, "Product not found", 404);
    sendSuccess(res, product);
  } catch (err) {
    next(err);
  }
};