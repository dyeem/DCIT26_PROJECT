import faq from '../Assets/faq.png'
export default function FaqPage() {
    return (
        <>
            <div className="bg-white flex justify-center items-center">
                <div className="max-w-[80rem]">
                    <div className="grid lg:grid-cols-1 xsm:grid-cols-1">
                        {/*HEADER */}
                        <div className="">
                            <div className="grid lg:grid-cols-2 xsm:grid-cols-1">
                                {/*intro*/}
                                <div className="text-left leading-relaxed place-self-center">
                                    <p className='text-5xl text-black font-serif mb-8'>Loop FAQ</p>
                                    <p className='text-gray-700 text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?</p>
                                </div>
                                {/*pic*/}
                                <div className="">
                                    <img src={faq} alt="" className='lg:w-[40rem] lg:h-auto' />
                                </div>
                            </div>
                        </div>
                        {/*questions */}
                        <div className="flex flex-col lg:flex-row gap-5 mt-7">
                            <div className='flex flex-col max-w-[15rem] leading-relaxed text-lg font-normal text-gray-700 '>
                                <a href="" className='text-gray-800 block border-gray-600 border-l p-3'>Getting Started with Loop</a>
                                <a href="" className='text-gray-800 block border-gray-600 border-l p-3'>Products on Loop</a>
                                <a href="" className='text-gray-800 block border-gray-600 border-l p-3'>Payments on Loop</a>
                                <a href="" className='text-gray-800 block border-gray-600 border-l p-3'>Payments on Loop</a>
                            </div>
                            <div className="rounded-md shadow-2xl max-w-[65rem] p-7 flex-grow">
                                <div className="flex flex-col">
                                    <p className='leading-relaxed text-2xl text-gray-800'>Getting Started with Loop</p>
                                    <div className="grid lg:grid-cols-2 xsm:grid-cols-1 gap-4 mt-8">
                                        <div className="leading-relaxed">
                                            <p className='text-gray-800 text-lg font-medium'>What is Loop?</p>
                                            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nam magnam totam labore ad, cumque eius provident nihil quidem laborum a optio repellendus reiciendis? Sapiente sed natus enim quisquam repellendus.</p>
                                        </div>
                                        <div className="leading-relaxed">
                                            <p className='text-gray-800 text-lg font-medium'>What is Loop?</p>
                                            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nam magnam totam labore ad, cumque eius provident nihil quidem laborum a optio repellendus reiciendis? Sapiente sed natus enim quisquam repellendus.</p>
                                        </div>
                                        <div className="leading-relaxed">
                                            <p className='text-gray-800 text-lg font-medium'>What is Loop?</p>
                                            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nam magnam totam labore ad, cumque eius provident nihil quidem laborum a optio repellendus reiciendis? Sapiente sed natus enim quisquam repellendus.</p>
                                        </div>
                                        <div className="leading-relaxed">
                                            <p className='text-gray-800 text-lg font-medium'>What is Loop?</p>
                                            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nam magnam totam labore ad, cumque eius provident nihil quidem laborum a optio repellendus reiciendis? Sapiente sed natus enim quisquam repellendus.</p>
                                        </div>
                                        <div className="leading-relaxed">
                                            <p className='text-gray-800 text-lg font-medium'>What is Loop?</p>
                                            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nam magnam totam labore ad, cumque eius provident nihil quidem laborum a optio repellendus reiciendis? Sapiente sed natus enim quisquam repellendus.</p>
                                        </div>
                                        <div className="leading-relaxed">
                                            <p className='text-gray-800 text-lg font-medium'>What is Loop?</p>
                                            <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nam magnam totam labore ad, cumque eius provident nihil quidem laborum a optio repellendus reiciendis? Sapiente sed natus enim quisquam repellendus.</p>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>                
            </div>
        </>
    )
}