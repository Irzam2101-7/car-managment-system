import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { signupSchema, loginSchema } from '../validations/auth.validation';

const router = Router();

/**
 * @route   POST /auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', validateRequest(signupSchema), (req, res) => authController.signup(req, res));

/**
 * @route   POST /auth/login
 * @desc    Authenticate a user and return a token
 * @access  Public
 */
router.post('/login', validateRequest(loginSchema), (req, res) => authController.login(req, res));

/**
 * @route   POST /auth/refresh-token
 * @desc    Refresh the access token using a refresh token
 * @access  Public
 */
router.post('/refresh-token', (req, res) => authController.refreshToken(req, res));

export default router;