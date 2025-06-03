import { useEffect, useState } from 'react';
// material ui for modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function ProductList() {
    const [imagePreview, setImagePreview] = useState(null);
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
    const handleOpenEdit = () => setEditOpen(true);
    const handleCloseEdit = () => setEditOpen(false);
    useEffect(() => {
        document.title = 'Loop | Manage Products';
    }, []);

    const mockProducts = [
        {
            product_id: 'P001',
            product_name: 'Crochet Doll',
            product_category: 'Dolls',
            product_color: 'Pink',
            product_price: 299.99,
            product_image: 'https://via.placeholder.com/50',
            product_description: 'Handmade crochet doll.',
            product_rating: 4.5,
            created_at: '2025-05-27',
        },
        {
            product_id: 'P002',
            product_name: 'Doily Set',
            product_category: 'Doilies',
            product_color: 'White',
            product_price: 149.0,
            product_image: 'https://via.placeholder.com/50',
            product_description: 'Elegant lace-style crochet doilies.',
            product_rating: 4.8,
            created_at: '2025-05-26',
        },
        // ... more mock products
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImagePreview(URL.createObjectURL(file));
        }
    };

    

    return (
        <>
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
                            <h2 className="text-2xl font-bold text-center text-[#7E62FF]">Add a Product</h2>
                        </div>

                        <form
                            className="flex flex-col gap-6 px-6 py-4 md:flex-row"
                            encType="multipart/form-data">
                            <div className="flex flex-col items-center w-full gap-4 md:w-1/2">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Image Preview:</p>
                                    <img
                                        src={imagePreview || 'Please put a Image.'}
                                        alt="Product Preview"
                                        className="object-cover border rounded-lg shadow-sm w-72 h-72"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7E62FF] file:text-white hover:file:bg-[#624bc7]"
                                    />
                                </div>
                            </div>

                            <div className="w-full space-y-4 md:w-1/2">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Product Name</label>
                                    <input
                                        type="text"
                                        name="product_name"
                                        required
                                        placeholder="Enter the product name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        required
                                        placeholder="Write a short description..."
                                        className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                    ></textarea>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Price (₱)</label>
                                        <input
                                        type="number"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        required
                                        placeholder="0.00"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
                                        <select
                                        name="category"
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E62FF]"
                                        >
                                        <option value="" disabled selected>Select a category</option>
                                        <option value="dolls">Dolls</option>
                                        <option value="jackets">Jackets</option>
                                        <option value="bouquet">Bouquet</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="doilies">Doilies</option>
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
            <div className="flex items-center justify-center w-full px-12 py-4 text-gray-700 font-poppins">
                <div className="flex flex-col gap-y-2 mt-[2rem] w-full max-w-8xl overflow-x-auto">
                    <div className="flex place-content-end">
                        <button onClick={handleOpenEdit} className='px-3 py-2 text-white transition-all bg-green-500 rounded-lg hover:bg-green-600 place-items-end'>
                            Add A Product
                        </button>
                    </div>
                    <div className="overflow-hidden bg-white rounded-lg shadow-md">
                        <table className="min-w-full text-sm text-left">
                            <thead className="text-xs font-semibold text-white uppercase bg-[#7E62FF]">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Color</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">Image</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Rating</th>
                                    <th scope="col" className="px-6 py-3">Created At</th>
                                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 ">
                                {mockProducts.map((product) => (
                                    <tr key={product.product_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{product.product_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product.product_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product.product_category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product.product_color}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">₱{product.product_price.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={product.product_image}
                                                alt={product.product_name}
                                                className="object-cover w-12 h-12 mx-auto rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="max-w-xs truncate">
                                            {product.product_description}
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product.product_rating}⭐</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product.created_at}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap"> 
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="text-white hover:text-white bg-[#7E62FF] hover:bg-[#624bc7] px-3 py-1 rounded-lg">Edit</button>
                                                <button className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-700 hover:text-white">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
