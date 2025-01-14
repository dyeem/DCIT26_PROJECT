import {Link} from 'react-router-dom'

//pics
import bg from '../Assets/bg.png' 
import logo from '../Assets/logo.png'

//pages
import Featured from './Featured';
import Gallery from './Gallery';
import AboutUs from './AboutUs'
import OurTeam from './OurTeam';
import ShopByCategory from './ShopByCategory'
import FeaturedwVid from './FeaturedwVid';
import CustomizePage from './CustomizePage';
export default function MainContent() {
    return (
        <>
           <div className="relative z-10">
                <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-35 z-30 "></div>
                    <div className="relative z-50 slide-up">
                        <h1 className="text-4xl font-thin leading-none tracking-widest text-white md:text-2xl lg:text-5xl xsm:text-2xl">
                            WELCOME TO
                        </h1>
                        <img src={logo} alt="" className='lg:w-[25rem] h-auto place-self-center xsm:w-[15rem]'/>
                        <p className="mb-6 text-white lg:text-5xl xsm:text-2xl xl:px-48 font-thin leading-relaxed">
                            Your Hand Crafted <br /> Yarn Shop
                        </p>
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#885b56] underline rounded-none focus:ring-[#885b56] bg-white lg:w-52 hover:bg-[#885b56] hover:text-white"
                        >
                            Learn more {">"}
                        </Link>
                    </div>
                </div>
            </div>
            {/* <Featured /> */}
            <FeaturedwVid/>
            <ShopByCategory/>
            <Gallery />
            <CustomizePage/> 
            <AboutUs/>
            <OurTeam/> 
        </>
    );
}
