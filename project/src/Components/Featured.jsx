export default function Featured() {
    //placeholder data
    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        ]
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xsm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative flex flex-col items-center border rounded-lg overflow-hidden shadow-sm"
                            >
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75"
                                />
                                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end items-start p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                                    <button className="px-3 py-2 bg-[#885b56] text-white rounded-lg text-sm hover:bg-[#31201e]">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}