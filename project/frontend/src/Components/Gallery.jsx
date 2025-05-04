// Import Swiper CSS styles at the top of your file
import 'swiper/css';  // Import core Swiper styles
import 'swiper/css/navigation';  // Import navigation styles (if needed)
import 'swiper/css/pagination';  // Import pagination styles (if needed)

import { Swiper, SwiperSlide } from 'swiper/react';
import Pouch1 from '../Assets/Gallery/pouch1.jpg';
import CatHood from '../Assets/Gallery/cathood.png';
import Boquet1 from '../Assets/Gallery/bouquet1.jpg';
import vintage from '../Assets/Products/Wearables/vintagatop2.png'

const product = {
  images: [
    { src: vintage, alt: 'Hand-woven Crochet Top' },
    { src: Pouch1, alt: 'Hand-woven Crochet Pouch' },
    { src: CatHood, alt: 'Hand-woven Crochet Cat Hood' },
    { src: Boquet1, alt: 'Hand-woven Crochet Bouquet' },
  ],
};

export default function Gallery() {
  return (
    <div className="bg-white pt-6 pb-16">
      <div className="flex flex-col lg:items-center justify-center xsm:items-start p-5 gap-y-3">
        <p className="lg:text-6xl xsm:text-3xl xsm:font-semibold lg:font-medium text-gray-900 font-serif">
          Gallery of Creations
        </p>
        <p className="lg:text-xl xsm:text-base lg:font-light text-gray-700 font-serif">
          Explore our Featured Gallery, where artistry meets passion. Each showcased piece is a testament to the beauty of handwoven crochet, blending intricate designs with functionality.
        </p>
      </div>

      {/* Carousel for xsm screens */}
      <div className="lg:hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="w-full"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative group">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <p className="text-white text-center text-lg font-medium px-4">
                    {image.alt}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for lg screens */}
      <div className="hidden lg:grid mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 bg-white">
        <div className="relative group">
          <img
            alt={product.images[0].alt}
            src={product.images[0].src}
            className="aspect-[3/4] size-full rounded-lg object-cover lg:block"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <p className="text-white text-center text-lg font-medium px-4">
              {product.images[0].alt}
            </p>
          </div>
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="relative group">
            <img
              alt={product.images[1].alt}
              src={product.images[1].src}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
              <p className="text-white text-center text-lg font-medium px-4">
                {product.images[1].alt}
              </p>
            </div>
          </div>
          <div className="relative group">
            <img
              alt={product.images[2].alt}
              src={product.images[2].src}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
              <p className="text-white text-center text-lg font-medium px-4">
                {product.images[2].alt}
              </p>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            alt={product.images[3].alt}
            src={product.images[3].src}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <p className="text-white text-center text-lg font-medium px-4">
              {product.images[3].alt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
