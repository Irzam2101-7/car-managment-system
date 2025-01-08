import { Router } from 'express';
import authRoutes from './auth.routes';
import carRoutes from './car.routes';
import categoryRoutes from './category.routes';

const router = Router();

// Register all routes here
router.use('/auth', authRoutes);
router.use('/car', carRoutes);
router.use('/category', categoryRoutes);

export default router;
