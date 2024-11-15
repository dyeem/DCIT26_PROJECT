const product = {
    images: [
      {
        src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
      {
        src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
        alt: 'Model wearing plain black basic tee.',
      },
      {
        src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
        alt: 'Model wearing plain gray basic tee.',
      },
      {
        src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt: 'Model wearing plain white basic tee.',
      },
    ],
}
export default function Gallery() {
    return (
        <div className="text-center bg-white pt-6 pb-6">
            <p className="text-black lg:text-5xl xsm:text-3xl p-4 font-bold">Gallery Styles are Finally Here!</p>
            <p className="lg:text-xl xsm:text-lg text-black font-normal text-center">
                Explore our Featured Gallery, where artistry meets passion. Each showcased piece is a testament to the beauty of handwoven crochet, blending intricate designs with functionality.</p>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 bg-white">
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
              />
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <img
                  alt={product.images[1].alt}
                  src={product.images[1].src}
                  className="aspect-[3/2] size-full rounded-lg object-cover"
                />
                <img
                  alt={product.images[2].alt}
                  src={product.images[2].src}
                  className="aspect-[3/2] size-full rounded-lg object-cover"
                />
              </div>
              <img
                alt={product.images[3].alt}
                src={product.images[3].src}
                className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
              />
            </div>
        </div>
    );
  }
  