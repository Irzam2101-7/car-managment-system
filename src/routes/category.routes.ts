import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { carCategoryValidationSchema } from '../validations/category.validation';

const router = Router();

/**
 * @route   POST /category
 * @desc    Add a new category
 * @access  Private
 */
router.post('/', authenticate, validateRequest(carCategoryValidationSchema), (req, res) => categoryController.createCategory(req, res));

/**
 * @route   GET /category
 * @desc    Retrieve all categories
 * @access  Public
 */
router.get('/', authenticate, (req, res) => categoryController.getCategories(req, res));

/**
 * @route   PUT /category/:id
 * @desc    Update a category
 * @access  Private
 */
router.put('/:id', authenticate, validateRequest(carCategoryValidationSchema), (req, res) => categoryController.updateCategory(req, res));

/**
 * @route   DELETE /category/:id
 * @desc    Delete a category
 * @access  Private
 */
router.delete('/:id', authenticate, (req, res) => categoryController.deleteCategory(req, res));

export default router;
