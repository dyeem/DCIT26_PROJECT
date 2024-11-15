import bg from '../Assets/bg.png'
import Featured from './Featured';
import Gallery from './Gallery';
export default function MainContent() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center bg-opacity-50" style={{ backgroundImage: `url(${bg})` }}>
                <h1 className="text-4xl font-medium leading-none tracking-tight text-white md:text-2xl lg:text-5xl xsm:text-3xl font-serif">
                Welcome to
                </h1>
                <h1 className="mb-4 text-4xl font-thin leading-none tracking-tight text-white md:text-5xl lg:text-9xl xsm:text-8xl font-serif">
                Loop
                </h1>
                <p className="mb-6 text-lg font-normal text-white lg:text-4xl xsm:text-3xl sm:px-16 xl:px-48 font-serif">
                Your Hand Crafted <br/> Yarn Shop.
                </p>
                <a
                    href="#"
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#885b56] underline rounded-none focus:ring-[#885b56] bg-white lg:w-52">
                    Learn more
                </a>
            </div>
            <Featured/>
            <Gallery/>
        </>
    );
}
