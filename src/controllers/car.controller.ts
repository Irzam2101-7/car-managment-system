import { Request, Response } from 'express';
import { ResponseBuilder } from '../utils/responseBuilder';
import logger from '../utils/logger';
import Car from '../models/car.model';

class CarController {
  
  /**
   * Add a new car
   */
  async addCar(req: Request, res: Response): Promise<void> {
    try {
      const { registrationNumber, make, model, color, category } = req.body;
      const { userId } = req.token_decoded;

      const existingCar = await Car.findOne({ registrationNumber });
      if (existingCar) {
        return ResponseBuilder.error(res, 400, 'Car with this registration number already exists');
      }

      const newCar = new Car({ registrationNumber, make, model, color, category, createdBy: userId });
      const savedCar = await newCar.save();

      ResponseBuilder.success(res, savedCar, 'Car added successfully');
    } catch (error) {
      logger.error('Error adding car:', { error });
      this.handleError(res, error);
    }
  }

  /**
   * Get all cars
   */
  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
        const cars = await Car.find().populate({
            path: "createdBy",
            model: "User",
            select: "username",
        });
      ResponseBuilder.success(res, cars, 'Cars retrieved successfully');
    } catch (error) {
      logger.error('Error fetching cars:', { error });
      this.handleError(res, error);
    }
  }

  /**
   * Get car by registration number
   */
  async getCarByRegistration(req: Request, res: Response): Promise<void> {
    const { registrationNumber } = req.params;

    try {
      const car = await Car.findOne({ registrationNumber });
      if (!car) {
        return ResponseBuilder.error(res, 404, 'Car not found');
      }
      ResponseBuilder.success(res, car, 'Car found');
    } catch (error) {
      logger.error('Error fetching car:', { error });
      this.handleError(res, error);
    }
  }

  /**
   * Update car details
   */
  async updateCar(req: Request, res: Response): Promise<void> {
    const { registrationNumber } = req.params;
    const { make, model, color, category } = req.body;

    try {
      const car = await Car.findOne({ registrationNumber });
      if (!car) {
        return ResponseBuilder.error(res, 404, 'Car not found');
      }

      car.make = make || car.make;
      car.model = model || car.model;
      car.color = color || car.color;
      car.category = category || car.category;

      const updatedCar = await car.save();

      ResponseBuilder.success(res, updatedCar, 'Car updated successfully');
    } catch (error) {
      logger.error('Error updating car:', { error });
      this.handleError(res, error);
    }
  }

  /**
   * Delete car by registration number
   */
  async deleteCar(req: Request, res: Response): Promise<void> {
    const { registrationNumber } = req.params;

    try {
      const car = await Car.findOne({ registrationNumber });
      if (!car) {
        return ResponseBuilder.error(res, 404, 'Car not found');
      }

      await car.deleteOne();

      ResponseBuilder.success(res, {}, 'Car deleted successfully');
    } catch (error) {
      logger.error('Error deleting car:', { error });
      this.handleError(res, error);
    }
  }

  // Common error handler for controllers
  private handleError(res: Response, error: any): void {
    ResponseBuilder.error(res, 500, error.message || 'Something went wrong');
  }
}

export const carController = new CarController();
