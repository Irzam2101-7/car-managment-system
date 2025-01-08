import cors from "cors";
import helmet from 'helmet';
import dotenv from "dotenv";
import routes from './routes';
import logger from "./utils/logger";
import bodyParser from "body-parser";
import express, { Application } from 'express';
import connectDB from './config/connect-mongoose';
import errorHandler from './middlewares/errorHandler';
import { notFoundHandler } from "./middlewares/notFound";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT_NO ?? 5001;

connectDB();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use centralized routes
app.use('/api', routes);

// Catch unmatched routes (404)
app.use('*', notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
