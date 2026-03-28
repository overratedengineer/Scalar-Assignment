// src/controllers/category.controller.js
import * as categoryService from "../services/category.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const listCategories = async (req, res, next) => {
  try {
    const tree = await categoryService.getCategoryTree();
    sendSuccess(res, tree);
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    if (!category) return sendError(res, "Category not found", 404);
    sendSuccess(res, category);
  } catch (err) {
    next(err);
  }
};