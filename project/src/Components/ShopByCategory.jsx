// Import Swiper CSS styles at the top of your file
import 'swiper/css';  // Import core Swiper styles
import 'swiper/css/navigation';  // Import navigation styles (if needed)
import 'swiper/css/pagination';  // Import pagination styles (if needed)

import bouquet from '../Assets/Gallery/bouquet1.jpg'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

const categories = [
  { image: bouquet, label: "New Arrivals", link: ""},
  { image: bouquet, label: "Bouquet", link: ""},
  { image: bouquet, label: "Jackets", link: ""},
  { image: bouquet, label: "Accessories", link: ""},
  { image: bouquet, label: "Dolls", link: ""},
];

export default function Categories () {
  return (
    <div className="bg-white">
        <div className="leading-relaxed text-black mx-auto max-w-5xl px-4 xl:py-4 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
            <p className="text-3xl lg:text-5xl font-normal font-serif tracking-tight text-gray-900  lg:text-center pb-6">
                Shop By Category
            </p>
            <div className="lg:grid lg:grid-cols-5 xsm:hidden xsm:overflow-x-auto xsm:whitespace-nowrap gap-4 p-4 group place-self-center">
                {categories.map((category, index) => (  
                    <Link
                        key={index}
                        className="relative flex-shrink-0 flex flex-col items-center rounded-lg overflow-hidden shadow-md lg:group-hover:opacity-70 hover:!opacity-100 transition-opacity duration-300"
                    >
                        <img
                            src={category.image}
                            alt={category.label}
                            className="w-full xsm:h-[30rem] lg:h-[30rem] object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-start p-4 text-white leading-relaxed">
                            <p className="mb-2 text-2xl font-normal text-left">{category.label}</p>
                            <button className="px-3 py-1 hover:bg-[#885b56] bg-white text-black hover:text-white transition duration-300 rounded-2xl font-semibold">Shop Now</button>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Carousel for xsm screens */}
            <div className="lg:hidden p-2">
                <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                className="w-full"
                >
                {categories.map((category, index) => (  
                    <SwiperSlide>
                        <Link
                            key={index}
                            className="relative flex-shrink-0 flex flex-col items-center rounded-lg overflow-hidden shadow-md lg:group-hover:opacity-70 hover:!opacity-100 transition-opacity duration-300"
                        >
                            <img
                                src={category.image}
                                alt={category.label}
                                className="w-full xsm:h-[30rem] lg:h-[30rem] object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-start p-4 text-white leading-relaxed">
                                <p className="mb-2 text-2xl font-normal text-left">{category.label}</p>
                                <button className="px-3 py-1 hover:bg-[#885b56] bg-white text-black hover:text-white transition duration-300 rounded-2xl font-semibold">Shop Now</button>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    </div>
  );
};