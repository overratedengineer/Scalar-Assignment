import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';

const JWT_SECRET = process.env.JWT_SECRET;
const GUEST_EMAIL = process.env.GUEST_AUTH_EMAIL || 'demo@flipkart.com';

export const verifyJWT = async (req, res, next) => {
  try {
    const fallbackToDemo = async () => {
      const demoUser = await prisma.user.findUnique({ where: { email: GUEST_EMAIL } });
      if (demoUser) {
        req.userId = demoUser.id;
        return next();
      }
      return res.status(401).json({ status: 'error', message: 'Authentication required' });
    };

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return await fallbackToDemo();
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === 'null' || token === 'undefined') {
      return await fallbackToDemo();
    }

    try {
      if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      // If the token is genuinely invalid or expired, continue as guest
      return await fallbackToDemo();
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Middleware error' });
  }
};
