import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { BaseController } from './base.controller';
import { ResponseBuilder } from '../utils/responseBuilder';
import UserModel from '../models/user.model';
import { sendWelcomeEmail } from '../services/email.service';
import { generateRandomPassword } from '../helper/password.helper';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

class AuthController extends BaseController {
    async signup(req: Request, res: Response): Promise<void> {
      try {
        const { username, email } = req.body;
  
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
          return ResponseBuilder.error(res, 400, 'User with this email already exists');
        }
  
        const randomPassword = generateRandomPassword();
        const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(randomPassword, SALT_ROUNDS);
  
        const newUser = new UserModel({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
  
        const userResponse = savedUser.toObject();
        delete userResponse.password;
  
        await sendWelcomeEmail(email, randomPassword);
  
        ResponseBuilder.success(res, userResponse, 'Signup successful!');
      } catch (error) {
        logger.error('Error in signup:', JSON.stringify(error));
        this.handleError(res, error);
      }
    }
  
    async login(req: Request, res: Response): Promise<void> {
      try {
        const { email, password } = req.body;
  
        const user = await UserModel.findOne({ email });
        if (!user) {
          return ResponseBuilder.error(res, 401, 'Authentication failed', { reason: 'User does not exist' });
        }
  
        if (!user.password) {
          return ResponseBuilder.error(res, 401, 'Invalid user data');
        }
  
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return ResponseBuilder.error(res, 401, 'Authentication failed', { reason: 'Invalid credentials' });
        }
  
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined');
        }
  
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2d' });
        ResponseBuilder.success(res, { token, userId: user._id }, 'Login successful!');
      } catch (error) {
        logger.error('Error in login:', { error });
        this.handleError(res, error);
      }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
      try {
        const { refreshToken } = req.body;
    
        // Check if refresh token exists
        if (!refreshToken) {
          return ResponseBuilder.error(res, 400, 'Refresh token is required');
        }
    
        // Get JWT_SECRET from environment
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined');
        }
    
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as jwt.JwtPayload; // Type assertion here
    
        const userId = decoded.userId;
        if (!userId) {
          return ResponseBuilder.error(res, 401, 'Invalid refresh token');
        }
    
        const user = await UserModel.findById(userId);
        if (!user) {
          return ResponseBuilder.error(res, 401, 'User not found');
        }
    
        // Generate new access token
        const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2d' });
        
        ResponseBuilder.success(res, { accessToken: newAccessToken }, 'New access token generated!');
      } catch (error) {
        logger.error('Error refreshing token:', error);
        ResponseBuilder.error(res, 500, 'Something went wrong while refreshing token');
      }
  }
}

export const authController = new AuthController();

