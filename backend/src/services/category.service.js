// src/services/category.service.js
import prisma from "../utils/prisma.js";

export const getCategoryTree = async () => {
  const all = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: { children: true },
      },
    },
  });
  return all;
};

export const getCategoryBySlug = async (slug) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
      parent: true,
    },
  });
};