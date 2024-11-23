import Pouch1 from '../Assets/Gallery/pouch1.jpg';
import CatHood from '../Assets/Gallery/cathood.png';
import Boquet1 from '../Assets/Gallery/bouquet1.jpg';
import Domeboquet1 from '../Assets/Gallery/domebouquet.jpg';

const product = {
    images: [
        {
            src: Domeboquet1,
            alt: 'Dome bouquet hand woven crochet',
        },
        {
            src: Pouch1,
            alt: 'Hand-woven crochet pouch',
        },
        {
            src: CatHood,
            alt: 'Hand-woven crochet cat hood',
        },
        {
            src: Boquet1,
            alt: 'Hand-woven crochet bouquet',
        },
    ],
};

export default function Gallery() {
    return (
        <div className="text-center bg-white pt-6 pb-16">
            <p className="text-black lg:text-5xl xsm:text-3xl p-4 font-normal font-serif">
                Gallery Styles are Finally Here!
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
                Explore our Featured Gallery, where artistry meets passion. Each showcased piece is a testament to the beauty of handwoven crochet, blending intricate designs with functionality.
            </p>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 bg-white">
                {/* Column 1 */}
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

                {/* Column 2 */}
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

                {/* Column 3 */}
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
