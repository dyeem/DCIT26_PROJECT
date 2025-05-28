import { useEffect } from 'react';

export default function ProductList() {
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

    return (
        <div className="flex items-center justify-center w-full p-4 font-roboto">
            <div className="mt-[2rem] w-full max-w-8xl overflow-x-auto">
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
                        <tbody className="divide-y divide-gray-200">
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
    );
}
