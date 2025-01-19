import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';


/*NOTE
  200 - Success Request
  201 - Created product
  404 - Not Found
  500 - Internal Server Error
*/

dotenv.config();
const app = express();

app.use(express.json()); //parsing incoming request body, accepting data as json

// FETCH ALL PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}); //empty argument meaning fetch all products
    res.status(200).json({success:true, data:products});
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({success:false, message: "Internal server error"});
  }
})

// CREATE A PRODUCT
app.post('/api/products', (req, res) => {
  const product = req.body;

  if(!product.name || !product.description || !product.price || !product.countInStock || !product.imageUrl || !product.size || !product.category || !product.color || !product.rating || !product.stars) {
    return res.status(400).json({success:false, message: "All fields are required"});
  }

  const newProduct = new Product(product)

  try{
    newProduct.save();
    return res.status(201).json({success:true, message: "Product created successfully"});

  }catch(error){
    console.error("Error creating product:", error);
    res.status(500).json({success:false, message: "Internal server error"});
  };

});

// DELETING A PRODUCT BY ID
app.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });

  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
  }

});

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port http://localhost:5000');
});

// username = johnmarknavajas14
// pass = tf7sGxPOLEZsbeRW