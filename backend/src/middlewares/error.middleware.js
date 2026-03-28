// src/middlewares/error.middleware.js
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
    });
  }

  // Prisma unique constraint
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ success: false, message: "Resource already exists" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }
  }

  // Custom app errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  // Generic
  res.status(500).json({ success: false, message: "Internal server error" });
};

export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}