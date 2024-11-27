import bouquet from '../Assets/Gallery/bouquet1.jpg'

const categories = [
  { image: bouquet, label: "New Arrivals" },
  { image: bouquet, label: "Bouquet" },
  { image: bouquet, label: "Jackets" },
  { image: bouquet, label: "Accessories" },
  { image: bouquet, label: "Dolls" },
];

const Categories = () => {
  return (
    <div className="bg-white">
        <div className="leading-relaxed text-black mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
            <p className="text-3xl lg:text-5xl font-normal font-serif tracking-tight text-gray-900 lg:pb-10 text-center">
                Shop By Category
            </p>
            <div className="grid lg:grid-cols-5 xsm:flex xsm:overflow-x-auto xsm:whitespace-nowrap gap-4 p-6 group place-self-center">
            {categories.map((category, index) => (
                <div
                key={index}
                className="relative flex-shrink-0 flex flex-col items-center rounded-sm overflow-hidden shadow-2xl lg:group-hover:opacity-70 hover:!opacity-100 transition-opacity duration-300"
                >
                    <img
                        src={category.image}
                        alt={category.label}
                        className="w-full xsm:h-[20rem] lg:h-[25rem] object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end items-center p-4 text-white">
                        <p className="mb-2 text-xl font-bold text-center">{category.label}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default Categories;
