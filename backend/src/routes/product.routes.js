import { Router } from 'express';
import { prisma } from '../index.js';

const router = Router();

// GET all categories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { children: true }
    });
    res.json({ status: 'success', data: categories });
  } catch (error) {
    next(error);
  }
});

// GET all products with filtering, search, and pagination
router.get('/', async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    let where = {};

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    
    if (category) {
      where.category = {
        OR: [
          { slug: category },
          { name: { equals: category, mode: 'insensitive' } }
        ]
      };
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { displayOrder: 'asc' } },
          category: true,
        },
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      status: 'success',
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        specs: true,
        category: true,
      }
    });

    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });

    res.json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
});

export default router;
