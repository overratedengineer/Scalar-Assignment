import app from '../app.js';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import authRoutes from './routes/auth.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
export const prisma = new PrismaClient();

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

async function startServer() {
  try {
    // Test DB Connection
    await prisma.$connect();
    console.log('✅ Connected to Database');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Trigger nodemon restart
