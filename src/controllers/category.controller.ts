import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { ResponseBuilder } from '../utils/responseBuilder';
import CarCategory from '../models/category.model';
import logger from '../utils/logger';

class CategoryController extends BaseController {

  // Create a new category
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.token_decoded; // Get userId from decoded token
      const { name } = req.body;

      // Check if category with the same name already exists
      const existingCategory = await CarCategory.findOne({ name });
      if (existingCategory) {
        return ResponseBuilder.error(res, 400, 'Category with this name already exists');
      }

      // Create a new category
      const newCategory = new CarCategory({ ...req.body, createdBy: userId });
      const savedCategory = await newCategory.save();

      ResponseBuilder.success(res, savedCategory, 'Category created successfully!');
    } catch (error) {
      logger.error('Error in createCategory:', { error });
      this.handleError(res, error);
    }
  }

  // Get all categories
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CarCategory.find().populate({
        path: 'createdBy',
        model: 'User',
        select: 'username',
      });
      ResponseBuilder.success(res, categories, 'Categories retrieved successfully!');
    } catch (error) {
      logger.error('Error in getCategories:', { error });
      this.handleError(res, error);
    }
  }

  // Update a category
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const updatedCategory = await CarCategory.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!updatedCategory) {
        return ResponseBuilder.error(res, 404, 'Category not found');
      }

      ResponseBuilder.success(res, updatedCategory, 'Category updated successfully!');
    } catch (error) {
      logger.error('Error in updateCategory:', { error });
      this.handleError(res, error);
    }
  }

  // Delete a category
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const deletedCategory = await CarCategory.findOneAndDelete({
        _id: req.params.id,
      });

      if (!deletedCategory) {
        return ResponseBuilder.error(res, 404, 'Category not found');
      }

      ResponseBuilder.success(res, deletedCategory, 'Category deleted successfully!');
    } catch (error) {
      logger.error('Error in deleteCategory:', { error });
      this.handleError(res, error);
    }
  }
}

export const categoryController = new CategoryController();
