import cors from "cors";
import helmet from 'helmet';
import dotenv from "dotenv";
import routes from './routes';
import logger from "./utils/logger";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from 'express';
import connectDB from './config/connect-mongoose';
import errorHandler from './middlewares/errorHandler';
import { notFoundHandler } from "./middlewares/notFound";
import compression from "compression";
import path from 'path';
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT_NO ?? 5001;

// Connect to database
connectDB();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Centralized routes
app.use('/api', routes);

// Catch unmatched routes (404)
app.use('*', notFoundHandler);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on("SIGINT", async () => {
    logger.info("SIGINT received. Shutting down gracefully...");
    await mongoose.connection.close();
    process.exit(0);
});

// Start the server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
