import mongoose from "mongoose";
import Product from "../backend/models/product.model.js";

export const getProduct = async (req, res) => {
    try {
      const products = await Product.find({}); //empty argument meaning fetch all products
      res.status(200).json({success:true, data:products});
    } catch (error) {
      console.log("error in fetching products:", error.message);
      res.status(500).json({success:false, message: "Internal server error"});
    }
}

export const createProduct = async (req, res) => {
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
}

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true });
      res.status(200).json({ success: true, data: updatedProduct });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  
}

export const deleteProduct =  async (req, res) => {
    const productId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    
    try {
      await Product.findByIdAndDelete(productId);
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
  
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  
}