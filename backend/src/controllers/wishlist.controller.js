import { prisma } from "../index.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) return sendError(res, "productId is required", 400);

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.userId,
          productId: productId,
        },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id },
      });
      return sendSuccess(res, { added: false, productId }, 200, { message: "Removed from wishlist" });
    } else {
      await prisma.wishlistItem.create({
        data: {
          userId: req.userId,
          productId: productId,
        },
      });
      return sendSuccess(res, { added: true, productId }, 201, { message: "Added to wishlist" });
    }
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const items = await prisma.wishlistItem.findMany({
      where: { userId: req.userId },
      include: {
        product: {
          include: {
            images: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(res, items);
  } catch (error) {
    next(error);
  }
};
