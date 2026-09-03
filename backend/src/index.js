import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS'));
  },
}));
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
