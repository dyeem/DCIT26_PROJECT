import avatar from '../Assets/avatar.jpg';

export default function Reviews() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-white  ">
            <div className="max-w-[85rem] w-full pl-5 pr-6">
                {/* Header */}
                <div className="text-center lg:mb-8 lg:p-6">
                    <h2 className="lg:text-5xl leading-relaxed xsm:text-3xl font-serif mb-2 text-black">Customer Reviews</h2>
                </div>

                {/* Rating Breakdown */}
                <div className="shadow-2xl rounded-xl p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        {/* Left Section */}
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-500 text-2xl flex">★★★★☆</div>
                                <span className="ml-2 text-gray-600 text-sm">Based on 1624 reviews</span>
                            </div>
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span className="text-sm text-gray-700 w-8">{rating} ★</span>
                                    <div className="bg-gray-300 h-2 flex-1 mx-2 rounded">
                                        <div
                                            className="bg-yellow-500 h-full rounded"
                                            style={{ width: `${[63, 10, 6, 12, 9][index]}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        {[63, 10, 6, 12, 9][index]}%
                                    </span>
                                </div>
                            ))}
                            <button className="mt-4 w-full px-4 py-2 bg-white text-gray-700 border border-yellow-600 rounded hover:bg-yellow-400 hover:text-white">
                                Write a review
                            </button>
                        </div>
                        {/* Right Section - Reviews */}
                        <div className="lg:col-span-2 space-y-8">
                            {[
                                {
                                    name: "Shehanna Marie Aquino",
                                    rating: 5,
                                    text: "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
                                    img: avatar,
                                },
                                {
                                    name: "Arlan Moncada",
                                    rating: 5,
                                    text: "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
                                    img: avatar,
                                },
                                {
                                    name: "Manuelito Samar Jr.",
                                    rating: 5,
                                    text: "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
                                    img: avatar,
                                },
                                {
                                    name: "Crystal Nable",
                                    rating: 4,
                                    text: "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
                                    img: avatar,
                                },
                                {
                                    name: "Muhaimin Macapundag",
                                    rating: 3,
                                    text: "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
                                    img: avatar,
                                },
                            ].map((review, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={review.img}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <div className="flex items-center">
                                                <h3 className="font-semibold text-black">{review.name}</h3>
                                                <div className="ml-2 text-yellow-500 flex text-sm">
                                                    {"★".repeat(review.rating)}
                                                    {"☆".repeat(5 - review.rating)}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mt-1 leading-relaxed">
                                                {review.text}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Add the horizontal rule here */}
                                    {index < 4 && (
                                        <hr className="border-t-1 border-yellow-500 my-6" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
