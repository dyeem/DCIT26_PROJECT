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
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-5xl font-normal font-serif tracking-tight text-gray-900 lg:pb-10">Customers also purchased</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xsm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 group">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="relative flex flex-col items-center rounded-sm overflow-hidden shadow-2xl group-hover:opacity-50 hover:!opacity-100 transition-opacity duration-300"
                            >
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="aspect-square w-full bg-gray-200 object-cover"
                                />
                                <div className="absolute inset-0  flex flex-col justify-end items-start p-4 text-[#885b56]">
                                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                                    <button className="px-3 py-2 bg-white text-[#885b56] rounded-lg text-sm hover:bg-[#885b56] hover:text-white shadow-xl ">
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