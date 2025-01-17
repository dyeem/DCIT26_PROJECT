import avatar from '../Assets/avatar.jpg'
import mission from '../Assets/mission_pic.jpg'
import vision from '../Assets/vision_pic.jpg'

export default function About() {
    return (
        <>
            <div className="flex justify-center bg-white p-10 text-center min-h-screen ">
                <div className="max-w-[90rem]">
                    <h2 className="text-black lg:text-5xl xsm:text-3xl font-normal font-serif  mb-12">About Us</h2>
                    
                    <div className="grid grid-cols-1 gap-12 py-8 px-6 rounded-xl shadow-2xl bg-white">
                    
                        {/* Mission Section */}
                        <div className="grid md:grid-cols-2 xsm:grid-cols-1 gap-8 items-center">
                            <div className="md:text-left xsm:text-center">
                                <h3 className="text-black lg:text-4xl xsm:text-3xl font-serif mb-4 relative group">
                                    Mission
                                    <span 
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                    />
                                </h3>
                                <p className="text-gray-700 lg:text-lg leading-relaxed">
                                To celebrate the timeless art of crochet by offering meticulously handcrafted, high-quality, and sustainable crochet products. We aim to empower local artisans, preserve traditional craftsmanship, and bring joy to our customers through unique, eco-friendly designs that blend creativity and functionality.
                                </p>
                            </div>
                            <img 
                            src={mission} 
                            alt="Representation of our mission" 
                            className="w-[30rem] rounded-xl shadow-lg mx-auto hidden md:block"
                            />
                        </div>
                        
                        {/* Vision Section */}
                        <div className="grid md:grid-cols-2 xsm:grid-cols-1 gap-8 items-center">
                            <img 
                            src={vision} 
                            alt="Representation of our vision" 
                            className="w-[30rem] h-auto rounded-xl shadow-lg mx-auto hidden md:block"
                            />
                            <div className="md:text-left xsm:text-center">
                                <h3 className="text-black lg:text-5xl xsm:text-3xl font-serif mb-4 relative group">
                                    Vision
                                    <span 
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                    />
                                </h3>
                                <p className="text-gray-700 lg:text-lg leading-relaxed">
                                    To become a global symbol of excellence in hand-woven crochet artistry, fostering a deep appreciation for handmade crafts while promoting sustainable practices and supporting communities of skilled artisans.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}