import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes (to be created later)
import beachRoutes from './routes/beachRoutes';
import weatherRoutes from './routes/weatherRoutes';
import alertRoutes from './routes/alertRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Routes
app.use('/api/beaches', beachRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Beach Safety API is running...');
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`⚡️ Server running on port ${port}`);
  });
});

export default app; 