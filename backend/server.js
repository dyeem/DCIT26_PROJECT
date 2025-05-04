import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const __dirname = path.resolve();

app.use(express.json()); //parsing incoming request body, accepting data as json

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on port http://localhost:'+ PORT);
});





// username = johnmarknavajas14
// pass = tf7sGxPOLEZsbeRW