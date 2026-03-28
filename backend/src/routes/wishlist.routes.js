import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleWishlist, getWishlist } from "../controllers/wishlist.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/toggle", toggleWishlist);
router.get("/", getWishlist);

export default router;
