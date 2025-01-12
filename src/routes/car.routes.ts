import { Router } from 'express';
import { carController } from '../controllers/car.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { carValidationSchema } from '../validations/car.validation';
import { authenticate } from '../middlewares/auth';

const router = Router();

/**
 * @route   POST /cars/add
 * @desc    Add a new car
 * @access  Private (Authenticated)
 */
router.post('/add', authenticate, validateRequest(carValidationSchema), (req, res) => carController.addCar(req, res));

/**
 * @route   GET /cars
 * @desc    Get all cars
 * @access  Public
 */
router.get('/', authenticate, (req, res) => carController.getAllCars(req, res));

/**
 * @route   GET /cars/:registrationNumber
 * @desc    Get car by registration number
 * @access  Public
 */
router.get('/:registrationNumber', authenticate, (req, res) => carController.getCarByRegistration(req, res));

/**
 * @route   PUT /cars/update/:registrationNumber
 * @desc    Update car details
 * @access  Private (Authenticated)
 */
router.put('/update/:registrationNumber', authenticate, validateRequest(carValidationSchema), (req, res) => carController.updateCar(req, res));

/**
 * @route   DELETE /cars/delete/:registrationNumber
 * @desc    Delete a car by registration number
 * @access  Private (Authenticated)
 */
router.delete('/delete/:registrationNumber', authenticate, (req, res) => carController.deleteCar(req, res));

export default router;
