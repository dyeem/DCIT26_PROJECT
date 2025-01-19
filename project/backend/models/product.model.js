import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
}, {
    timestamps: true //created at and updated at
});

const Product = mongoose.model('Product', productSchema);

export default Product;