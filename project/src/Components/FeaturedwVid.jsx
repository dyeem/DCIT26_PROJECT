import FeaturedVid from '../Assets/Sample Vids/FeaturedVid.mp4';
import { Link } from 'react-router-dom';

export default function FeaturedVidComponent() {
    return (
        <>
            <div className=" flex flex-col max-w-full justify-center items-center px-5 py-12  bg-white lg:gap-y-4">
                <div className="flex flex-col justify-center lg:items-center xsm:items-start leading-relaxed -tracking-normal lg:text-center xsm:text-left lg:gap-y-7 xsm:gap-y-4 mb-10">
                    <p className="lg:text-6xl xsm:text-3xl xsm:font-semibold lg:font-medium text-gray-900 font-serif">
                        Discover the Art of Handmade Elegance
                    </p>
                        {/* <p className="lg:text-3xl xsm:text-xl text-gray-800 font-serif">
                            Warm, Cozy, and Unique – Just Like You
                        </p> */}
                    <p className="lg:text-xl xsm:text-base lg:font-light text-gray-700 font-serif">
                        Find beautifully crafted crochet pieces that add warmth to your life. From timeless classics to trendy designs, <br />
                        every stitch tells a story.
                    </p>
                    <Link
                        to="sales"
                        className="bg-[#885b56] hover:bg-[#b8817b] text-white px-4 py-2 shadow-xl text-lg"
                    >
                        Shop Crochet
                    </Link>
                </div>
                <video
                    src={FeaturedVid}
                    autoPlay
                    loop
                    muted
                    className="w-full rounded-md lg:w-[100rem] lg:h-auto xsm:h-[400px] object-cover shadow-2xl"
                />
            </div>
        </>
    );
}
