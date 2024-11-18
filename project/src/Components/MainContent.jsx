import bg from '../Assets/bg.png' 
import Featured from './Featured';
import Gallery from './Gallery';
import Banner from './Banner'
import AboutUs from './AboutUs'
import OurTeam from './OurTeam';
import ContactUs from './ContactUs';

export default function MainContent() {
    return (
        <>
           <Banner />
           <div className="relative ">
                <div
                    className="relative flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-35 z-40 "></div>
                    <div className="relative z-50 slide-up">
                    <h1 className="text-4xl font-medium leading-none tracking-tight text-white md:text-2xl lg:text-5xl xsm:text-3xl font-serif">
                        Welcome to
                    </h1>
                    <h1 className="mb-4 text-4xl font-thin leading-none tracking-tight text-white md:text-5xl lg:text-9xl xsm:text-8xl font-serif">
                        Loop
                    </h1>
                    <p className="mb-6 text-lg font-normal text-white lg:text-4xl xsm:text-3xl sm:px-16 xl:px-48 font-serif">
                        Your Hand Crafted <br /> Yarn Shop.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#885b56] underline rounded-none focus:ring-[#885b56] bg-white lg:w-52 hover:bg-[#885b56] hover:text-white"
                    >
                        Learn more {">"}
                    </a>
                    </div>
                </div>
            </div>
            <Featured />
            <Gallery />
            <AboutUs/>
            <OurTeam/>
        </>
    );
}
