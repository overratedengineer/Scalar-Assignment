// src/services/product.service.js
import prisma from "../utils/prisma.js";

const productInclude = {
  images: { orderBy: { displayOrder: "asc" } },
  category: { select: { id: true, name: true, slug: true } },
};

const productDetailInclude = {
  ...productInclude,
  specs: { orderBy: { groupName: "asc" } },
};

export const getProducts = async ({ category, search, page, limit, minPrice, maxPrice, brand, sortBy }) => {
  const where = { isActive: true };

  if (category) {
    // Support filtering by category slug — find the category id first
    const cat = await prisma.category.findUnique({ where: { slug: category } });
    if (cat) where.categoryId = cat.id;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { brand: { contains: search, mode: "insensitive" } },
    ];
  }

  if (brand) where.brand = { equals: brand, mode: "insensitive" };

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  const orderBy = {
    price_asc: { price: "asc" },
    price_desc: { price: "desc" },
    rating: { rating: "desc" },
    newest: { createdAt: "desc" },
  }[sortBy] || { createdAt: "desc" };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: productInclude,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id) => {
  return prisma.product.findFirst({
    where: { id, isActive: true },
    include: productDetailInclude,
  });
};