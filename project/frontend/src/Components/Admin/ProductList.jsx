import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import toast, { Toaster } from 'react-hot-toast';
import loading from '../../Assets/Animations/loading.mp4'


// material ui for modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import imageAlt from '../../Assets/image_alt.png';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [colorInput, setColorInput] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    

    // INITIAL STATE FOR FORM DATA
    const [formData, setFormData] = useState({
        product_name: '',
        product_category: '',
        product_color: [],
        product_price: '',
        product_image_names: [],
        product_description: '',
        product_quantity: '',
        product_size: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    // modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
    };
    const [EditOpen, setEditOpen] = useState(false);
    const [AddOpen, setAddOpen] = useState(false);

    // HANDLING OPENING MODAL FOR EDITING PRODUCT, FETCHING PRODUCT DETAILS
    function handleOpenEdit(productId) {
        setEditOpen(true);
        
        axios.get(`http://localhost/loop_backend/admin/products/fetchproducts.php?id=${productId}`, {
            withCredentials: true,
        })
        .then(res => {
            if (res.data.success) {
                const product = res.data.product;

                setFormData({
                    ...product,
                    product_color: typeof product.product_color === 'string'
                        ? product.product_color.split(',').map(c => c.trim()).filter(Boolean)
                        : [],
                    product_size: typeof product.product_size === 'string'
                        ? product.product_size.split(',').map(s => s.trim()).filter(Boolean)
                        : [],
                    product_image_names: typeof product.product_image === 'string'
                        ? product.product_image.split(',').map(img => img.trim()).filter(Boolean)
                        : []
                });
                console.log('Product Details:', product);

                // SET IMAGE PREVIEW FROM EXISTING IMAGES AT THE DATABASE
                if (product.product_image) {
                    const existingImages = product.product_image.split(',').map(img => img.trim()).filter(Boolean);
                    const previewUrls = existingImages.map(img => `/Assets/Products/${product.product_category}/${img}`);
                    setImagePreviews(previewUrls);
                } else {
                    setImagePreviews([]);
                }
            } else {
                toast.error(res.data.message || 'Failed to fetch product details');
            }
        })
        .catch(err => {
            console.error(err);
            toast.error('Failed to fetch product details');
        });
    }
    const handleCloseEdit = () => setEditOpen(false);

    //TOGGLE ADD MODAL AND UNSETTING FORM DATA
    function handleOpenAdd() {
        setAddOpen(true);
        setFormData({
            product_name: '',
            product_category: '',
            product_color: [],
            product_price: '',
            product_image_names: [],
            product_description: '',
            product_quantity: '',
            product_size: [],
        });
        setImagePreviews([]);
    }

    function handleCloseAdd() {
        setAddOpen(false);
        // Clean up preview URLs - add safety check
        if (Array.isArray(imagePreviews)) {
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
        }
        setImagePreviews([]);
    }
    
    //TITLE
    useEffect(() => {
        document.title = 'Loop | Manage Products';
    }, []);

    //FETCHING DATA
    useEffect(() => {
        setIsRefreshing(true);
        axios.get('http://localhost/loop_backend/admin/products/fetchproducts.php', {
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);
            setProducts(res.data.products);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 2000);
        })
        .catch(err => console.error(err));
    }, []);

    //HANDLING CHANGE FOR IMAGE PREVIEW
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        const currentImageCount = imagePreviews.length;
        const newImageCount = files.length;
        
        if (currentImageCount + newImageCount > 5) {
            toast.error(`You can only have up to 5 images total. You currently have ${currentImageCount} images.`);
            return;
        }

        // Extract just the filenames from new files
        const newImageNames = files.map(file => file.name);
        
        // Create preview URLs for new files
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        
        // Append to existing previews and names
        setImagePreviews(prev => [...prev, ...newPreviewUrls]);
        setFormData(prevData => ({
            ...prevData,
            product_image_names: [...prevData.product_image_names, ...newImageNames],
        }));
    };

    // Remove specific image
    const removeImage = (indexToRemove) => {


        const urlToRemove = imagePreviews[indexToRemove];
        
        // Only revoke URL if it's a blob URL (newly uploaded), not existing image paths
        if (urlToRemove && urlToRemove.startsWith('blob:')) {
            URL.revokeObjectURL(urlToRemove);
        }
        
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
        setFormData(prev => ({
            ...prev,
            product_image_names: prev.product_image_names.filter((_, index) => index !== indexToRemove)
        }));
    };

    //HANDLING CHANGE FOR FORM DATA
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };


    //HANDLING SUBMIT FOR ADDING PRODUCT
    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.product_image_names.length === 0) {
            toast.error('Please select at least one image');
            return;
        }

        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Create regular object (not FormData) since we're only sending names
        const productData = {
            product_name: formData.product_name,
            product_category: formData.product_category,
            product_color: formData.product_color,
            product_price: formData.product_price,
            product_description: formData.product_description,
            product_quantity: formData.product_quantity,
            product_size: formData.product_size,
            product_image: formData.product_image_names.join(','), // Send as comma-separated string
            product_rating: 0,
            created_at: timestamp,
        };

        try {
            const response = await axios.post(
                'http://localhost/loop_backend/admin/products/addproduct.php',
                JSON.stringify(productData), // Send as JSON
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json', // JSON content type
                    },
                }
            );

            if (response.status === 200 && response.data.success) {
                const addedProduct = response.data.product;
                setProducts(prev => [...prev, addedProduct]);
                handleCloseAdd();
                
                setFormData({
                    product_name: '',
                    product_category: '',
                    product_color: [],
                    product_price: '',
                    product_image_names: [],
                    product_description: '',
                    product_quantity: '',
                    product_size: [],
                });
                setImagePreviews([]);

                toast.success('Product added Successfully!');
            } else {
                console.error('Failed to add product');
                toast.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product: ' + error.message);
        }
    }

    //HANDLING SUBMIT FOR EDITING PRODUCT
    async function handleEditSubmit(e) {
        e.preventDefault();

        // Check if product ID is present
        if (!formData.product_id) {
            toast.error('Product ID is missing');
            return;
        }

        if (!validateForm()) return;

        console.log('Form Data:', formData);

        try {
            const editedProduct = {
                product_id: formData.product_id,
                product_name: formData.product_name,
                product_category: formData.product_category,
                product_color: formData.product_color, 
                product_price: formData.product_price, 
                product_description: formData.product_description,
                product_quantity: formData.product_quantity,
                product_image: formData.product_image_names,
                product_size: formData.product_size, 
            };

            console.log('Sending edit data:', editedProduct); 

            const response = await axios.put(
                `http://localhost/loop_backend/admin/products/updateproduct.php`,
                editedProduct,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Response:', response.data);

            if (response.data.success) {
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.product_id === editedProduct.product_id
                            ? response.data.product 
                            : product
                    )
                );

                setFormData({
                    product_id: '',
                    product_name: '',
                    product_category: '',
                    product_color: [],
                    product_price: '',
                    product_image_names: [], 
                    product_description: '',
                    product_quantity: '',
                    product_size: [],
                });

                if (Array.isArray(imagePreviews)) {
                    imagePreviews.forEach(url => {
                        if (url.startsWith('blob:')) {
                            URL.revokeObjectURL(url);
                        }
                    });
                }
                setImagePreviews([]);

                handleCloseEdit();
                toast.success('Product Updated Successfully!');
            } else {
                toast.error(response.data.message || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            
            // More detailed error logging
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
                console.error('Response headers:', error.response.headers);
                
                if (error.response.status === 404) {
                    toast.error('Product not found or endpoint not available');
                } else if (error.response.status === 400) {
                    toast.error('Invalid data: ' + (error.response.data.message || 'Bad request'));
                } else {
                    toast.error('Server error: ' + (error.response.data.message || error.message));
                }
            } else if (error.request) {
                console.error('Request made but no response:', error.request);
                toast.error('No response from server. Check if the backend is running.');
            } else {
                console.error('Error setting up request:', error.message);
                toast.error('Failed to update product: ' + error.message);
            }
        }
    }

    function validateForm() {
        const errors = [];

        if (!formData.product_name) errors.push('Product name is required');
        if (!formData.product_category) errors.push('Category is required');
        if (!formData.product_price || parseFloat(formData.product_price) <= 0) errors.push('Valid price is required');
        if (!formData.product_description) errors.push('Description is required');
        if (!formData.product_quantity || parseInt(formData.product_quantity) < 0) errors.push('Valid quantity is required');

        if (errors.length > 0) {
            toast.error(errors.join(', '));
            return false;
        }

        return true;
    }
    
    //HANDLING DELETE PRODUCT
    function handleDelete(productId) {
        console.log('Delete button clicked Product: ' + productId);
        
        axios.delete(`http://localhost/loop_backend/admin/products/deleteproduct.php?id=${productId}`, {
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);
            setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId));
            toast.success('Product Deleted Successfully!');
        })
        .catch(err => {
            console.error(err);
            toast.error('Failed to delete product.');
        });
        
    }

    return (
        <>
            {isRefreshing && (
              <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex flex-col items-center justify-center">
                  <p className="mb-4 text-lg font-medium text-gray-700">Hang tight, fetching the latest data...</p>
                  <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-32 h-32 object-contain"
                      >
                      <source src={loading} type="video/webm" />
                  </video>
              </div>
            )}
            {/*ADD PRODUCT MODAL */}
            <div>
                <Modal
                    open={AddOpen}
                    onClose={handleCloseAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box
                        sx={style}
                        className="rounded-2xl bg-white text-gray-800 w-[95%] max-w-5xl shadow-xl"
                    >
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-center text-[#7E62FF]">
                                Add a Product
                            </h2>
                        </div>

                        <form
                            className="flex flex-col gap-6 px-6 py-4 md:flex-row"
                            onSubmit = {handleSubmit}
                        >
                            <div className="w-full space-y-4 md:w-1/2">
                                <div className="w-full">
                                    <p className="mb-2 text-sm font-medium text-gray-700">
                                        Image Previews:
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {Array.isArray(imagePreviews) && imagePreviews.length > 0 ? (
                                            imagePreviews.map((preview, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={preview}
                                                        alt={`Product Preview ${index + 1}`}
                                                        className="object-cover w-full border rounded-lg shadow-sm h-32"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                        {index + 1}
                                                    </div>
                                                    {/* Show filename */}
                                                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded max-w-20 truncate">
                                                        {formData.product_image_names[index]}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-2 flex items-center justify-center">
                                                <img
                                                    src={imageAlt}
                                                    alt="No images selected"
                                                    className="object-cover border rounded-lg shadow-sm w-48 h-48 opacity-50"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {/* File Input */}
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Select Images (Max 5)
                                        </label>
                                        <input
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            multiple
                                            required
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7E62FF] file:text-white hover:file:bg-[#624bc7]"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Select multiple images.
                                        </p>
                                        
                                        {/* Show selected filenames */}
                                        {Array.isArray(formData.product_image_names) && formData.product_image_names.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-600">Selected files:</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {formData.product_image_names.map((name, index) => (
                                                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                                            {name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full space-y-4 md:w-1/2">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter the product name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                    />
                                    </div>

                                    <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="product_description"
                                        rows="3"
                                        value={formData.product_description}
                                        onChange={handleChange}
                                        placeholder="Write a short description..."
                                        className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                    ></textarea>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Price (₱)
                                        </label>
                                        <input
                                            type="number"
                                            name="product_price"
                                            min="0"
                                            step="0.01"
                                            value={formData.product_price}
                                            onChange={handleChange}
                                            required
                                            placeholder="0.00"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                    </div>

                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="product_quantity"
                                            min="1"
                                            value={formData.product_quantity}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. 10"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                    </div>
                                    
                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <select
                                            name="product_category"
                                            value={formData.product_category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                            >
                                            <option value="" disabled selected>
                                                Select a category
                                            </option>
                                            <option value="Dolls">Dolls</option>
                                            <option value="Flowers">Flowers</option>
                                            <option value="Hairclips">Hairclips</option>
                                            <option value="Hat">Hat</option>
                                            <option value="Keychain">Keychain</option>
                                            <option value="Miscellaneous">Miscellaneous</option>
                                            <option value="Wearables">Wearables</option>
                                        </select>
                                    </div>
                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Size
                                        </label>
                                        <input
                                            type="text"
                                            name="product_size"
                                            value={formData.product_size}
                                            onChange={handleChange}
                                            placeholder="e.g. S, M, L, XL"
                                            required
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(Array.isArray(formData.product_size)
                                                ? formData.product_size
                                                : typeof formData.product_size === 'string'
                                                ? formData.product_size.split(',').map(s => s.trim()).filter(Boolean)
                                                : []
                                            ).map((size, index) => (
                                                <span
                                                key={index}
                                                className="px-2 py-1 text-sm text-white bg-indigo-500 rounded-full"
                                                >
                                                {size}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Color(s)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type color and press comma"
                                            onKeyDown={(e) => {
                                            if (e.key === ',' || e.key === 'Enter') {
                                                e.preventDefault();
                                                const newColor = e.target.value.trim().replace(',', '');
                                                if (newColor && !formData.product_color.includes(newColor)) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    product_color: [...prev.product_color, newColor],
                                                }));
                                                }
                                                e.target.value = '';
                                            }
                                            }}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(Array.isArray(formData.product_color)
                                                ? formData.product_color
                                                : typeof formData.product_color === 'string'
                                                ? formData.product_color.split(',').map(c => c.trim()).filter(Boolean)
                                                : []
                                            ).map((color, index) => (
                                                <span
                                                key={index}
                                                className="px-2 py-1 text-sm text-white bg-purple-500 rounded-full"
                                                >
                                                {color}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-white bg-[#7E62FF] hover:bg-[#624bc7] rounded-lg font-semibold transition duration-200"
                                    >
                                        Save Product
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>

            {/*MODIFY PRODUCT MODAL */}
            
            <div>
                <Modal
                    open={EditOpen}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box
                        sx={style}
                        className="rounded-2xl bg-white text-gray-800 w-[95%] max-w-5xl shadow-xl"
                    >
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-center text-[#7E62FF]">
                                Edit a Product
                            </h2>
                        </div>

                        <form
                            className="flex flex-col gap-6 px-6 py-4 md:flex-row"
                            encType="multipart/form-data"
                            onSubmit = {handleEditSubmit}
                        >
                            <div className="w-full space-y-4 md:w-1/2">
                                <div className="w-full">
                                    <p className="mb-2 text-sm font-medium text-gray-700">
                                        Image Previews:
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {Array.isArray(imagePreviews) && imagePreviews.length > 0 ? (
                                            imagePreviews.map((preview, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={preview}
                                                        alt={`Product Preview ${index + 1}`}
                                                        className="object-cover w-full border rounded-lg shadow-sm h-32"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                        {index + 1}
                                                    </div>
                                                    {/* Show filename */}
                                                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded max-w-20 truncate">
                                                        {formData.product_image_names[index]}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-2 flex items-center justify-center">
                                                <img
                                                    src={imageAlt}
                                                    alt="No images selected"
                                                    className="object-cover border rounded-lg shadow-sm w-48 h-48 opacity-50"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {/* File Input */}
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Select Images (Max 5)
                                        </label>
                                        <input
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7E62FF] file:text-white hover:file:bg-[#624bc7]"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Select multiple images.
                                        </p>
                                        
                                        {/* Show selected filenames */}
                                        {Array.isArray(formData.product_image_names) && formData.product_image_names.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-600">Selected files:</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {formData.product_image_names.map((name, index) => (
                                                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                                            {name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full space-y-4 md:w-1/2">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter the product name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="product_description"
                                        rows="3"
                                        value={formData.product_description}
                                        onChange={handleChange}
                                        placeholder="Write a short description..."
                                        className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                    ></textarea>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Price (₱)
                                        </label>
                                        <input
                                            type="number"
                                            name="product_price"
                                            min="0"
                                            step="0.01"
                                            value={formData.product_price}
                                            onChange={handleChange}
                                            required
                                            placeholder="0.00"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                    </div>

                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="product_quantity"
                                            min="1"
                                            value={formData.product_quantity}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. 10"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                    </div>

                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Color(s)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type color and press comma"
                                            value={colorInput}
                                            onChange={(e) => setColorInput(e.target.value)}
                                            onKeyDown={(e) => {
                                            if (e.key === ',' || e.key === 'Enter') {
                                                e.preventDefault();
                                                const newColor = colorInput.trim().replace(',', '');
                                                if (newColor && !formData.product_color.includes(newColor)) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    product_color: [...prev.product_color, newColor],
                                                }));
                                                }
                                                setColorInput('');
                                            }
                                            }}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {Array.isArray(formData.product_color) && formData.product_color.map((color, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-purple-500 rounded-full cursor-pointer"
                                                onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    product_color: prev.product_color.filter((_, i) => i !== index)
                                                }));
                                                }}
                                                title="Click to remove"
                                            >
                                                {color} ×
                                            </span>
                                            ))}
                                        </div>
                                    </div>

                                     <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Size
                                        </label>
                                        <input
                                            type="text"
                                            name="product_size"
                                            value={formData.product_size}
                                            onChange={handleChange}
                                            placeholder="e.g. S, M, L, XL"
                                            required
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(Array.isArray(formData.product_size)
                                                ? formData.product_size
                                                : typeof formData.product_size === 'string'
                                                ? formData.product_size.split(',').map(s => s.trim()).filter(Boolean)
                                                : []
                                            ).map((size, index) => (
                                                <span
                                                key={index}
                                                className="px-2 py-1 text-sm text-white bg-indigo-500 rounded-full"
                                                >
                                                {size}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-[48%]">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <select
                                            name="product_category"
                                            value={formData.product_category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                            >
                                            <option value="" disabled selected>
                                                Select a category
                                            </option>
                                            <option value="Dolls">Dolls</option>
                                            <option value="Flowers">Flowers</option>
                                            <option value="Hairclips">Hairclips</option>
                                            <option value="Hat">Hat</option>
                                            <option value="Keychain">Keychain</option>
                                            <option value="Miscellaneous">Miscellaneous</option>
                                            <option value="Wearables">Wearables</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-3 text-white bg-[#7E62FF] hover:bg-[#624bc7] rounded-lg font-semibold transition duration-200"
                                    >
                                        Save Product
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
            
            
            <div className="flex items-center justify-center w-full px-4 py-4 text-gray-700 sm:px-8 lg:px-12 font-poppins">
                <div className="flex flex-col gap-y-2 mt-[2rem] w-full max-w-8xl">
                    <div className="flex place-content-end">
                        <button onClick={handleOpenAdd} className='px-3 py-2 text-white transition-all bg-green-500 rounded-lg hover:bg-green-600 place-items-end'>
                            Add A Product
                        </button>
                    </div>
        
                    {/* Desktop Table View */}
                    <div className="hidden overflow-hidden bg-white rounded-lg shadow-md lg:block">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead className="text-xs font-semibold text-white uppercase bg-[#7E62FF]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ID</th>
                                        <th scope="col" className="px-6 py-3">Image</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Color</th>
                                        <th scope="col" className="px-6 py-3">Size</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Stock</th>
                                        <th scope="col" className="px-6 py-3">Created At</th>
                                        <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.product_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">{product.product_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={`/Assets/Products/${product.product_category}/${product.product_image.split(',')[0]}`}
                                                    alt="Product image"
                                                    className="object-cover w-12 h-12 mx-auto rounded-md"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.product_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.product_category}</td>
                                            <td className="max-w-xs truncate">{product.product_color}</td>
                                            <td className="max-w-xs truncate">{product.product_size}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">₱{product.product_price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.product_quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{dayjs(product.product_created_at).format('MMMM D, YYYY')}</td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap"> 
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={(e) => handleOpenEdit(product.product_id)} className="text-white hover:text-white bg-[#7E62FF] hover:bg-[#624bc7] px-3 py-1 rounded-lg">Edit</button>
                                                    <button onClick={(e) => handleDelete(product.product_id)} className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700 hover:text-white">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tablet View - Simplified Table */}
                    <div className="hidden overflow-hidden bg-white rounded-lg shadow-md md:block lg:hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead className="text-xs font-semibold text-white uppercase bg-[#7E62FF]">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Product</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                        <th scope="col" className="px-4 py-3">Stock</th>
                                        <th scope="col" className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.product_id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={`/Assets/Products/${product.product_category}/${product.product_image}`}
                                                        alt={product.product_name}
                                                        className="object-cover w-10 h-10 rounded-md"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{product.product_name}</div>
                                                        <div className="text-xs text-gray-500">ID: {product.product_id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">{product.product_category}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">₱{product.product_price}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{product.product_quantity}</td>
                                            <td className="px-4 py-4 text-center whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={(e) => handleOpenEdit(product.product_id)} className="text-white bg-[#7E62FF] hover:bg-[#624bc7] px-2 py-1 rounded text-xs">Edit</button>
                                                    <button onClick={(e) => handleDelete(product.product_id)} className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-700">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View - Card Layout */}
                    <div className="block space-y-4 md:hidden">
                        {products.map((product) => (
                            <div key={product.product_id} className="p-4 bg-white rounded-lg shadow-md">
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={`/Assets/Products/${product.product_category}/${product.product_image}`}
                                        alt={product.product_name}
                                        className="flex-shrink-0 object-cover w-16 h-16 rounded-md"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-medium text-gray-900 truncate">{product.product_name}</h3>
                                            <span className="text-lg font-bold text-[#7E62FF]">₱{product.product_price}</span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                                            <div><span className="font-medium">ID:</span> {product.product_id}</div>
                                            <div><span className="font-medium">Category:</span> {product.product_category}</div>
                                            <div><span className="font-medium">Color:</span> {product.product_color}</div>
                                            <div><span className="font-medium">Stock:</span> {product.product_quantity}</div>
                                            <div><span className="font-medium">Rating:</span> {product.product_rating}⭐</div>
                                            <div><span className="font-medium">Created:</span> {new Date(product.created_at).toLocaleDateString()}</div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <p className="text-sm text-gray-600 line-clamp-2">{product.product_description}</p>
                                        </div>
                                        
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={(e) => handleOpenEdit(product.product_id)} 
                                                className="flex-1 text-white bg-[#7E62FF] hover:bg-[#624bc7] px-3 py-2 rounded-lg text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={(e) => handleDelete(product.product_id)} 
                                                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false} 
            />
        </>
    );
}
