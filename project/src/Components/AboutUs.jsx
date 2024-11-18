import avatar from '../Assets/avatar.jpg'
export default function About() {
    return (
        <>
            <div className="flex justify-center bg-white p-10 text-center min-h-screen ">
                <div className="max-w-[90rem]">
                    <h2 className="text-black lg:text-5xl xsm:text-3xl font-normal font-serif  mb-12">About Us</h2>
                    
                    <div className="grid grid-cols-1 gap-12 py-8 px-6 rounded-xl shadow-2xl bg-white">
                    
                        {/* Mission Section */}
                        <div className="grid sm:grid-cols-2 gap-8 items-center">
                            <div className="text-left">
                            <h3 className="text-black lg:text-4xl xsm:text-3xl font-serif mb-4 relative group">
                                Mission
                                <span 
                                className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                />
                            </h3>
                            <p className="text-gray-700 lg:text-lg leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam excepturi molestiae maxime recusandae animi ab
                                sapiente a maiores deserunt iusto labore corporis accusantium esse! Ab quibusdam quis rerum animi velit.
                            </p>
                            </div>
                            <img 
                            src={avatar} 
                            alt="Representation of our mission" 
                            className="w-[20rem] h-auto rounded-xl shadow-lg mx-auto hidden lg:block"
                            />
                        </div>
                        
                        {/* Vision Section */}
                        <div className="grid sm:grid-cols-2 gap-8 items-center">
                            <img 
                            src={avatar} 
                            alt="Representation of our vision" 
                            className="w-[20rem] h-auto rounded-xl shadow-lg mx-auto hidden lg:block"
                            />
                            <div className="text-left">
                                <h3 className="text-black lg:text-5xl xsm:text-3xl font-serif mb-4 relative group">
                                    Vision
                                    <span 
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                    />
                                </h3>
                                <p className="text-gray-700 lg:text-lg leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam excepturi molestiae maxime recusandae animi ab
                                    sapiente a maiores deserunt iusto labore corporis accusantium esse! Ab quibusdam quis rerum animi velit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}