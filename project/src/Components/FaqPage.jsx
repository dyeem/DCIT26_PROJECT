import faq from '../Assets/faq.png'
export default function FaqPage() {
    const gettingStartedFaq = {
        "Getting Started with Loop": [
            {
                id: 1,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            }
        ],
        "Products on Loop": [
            {
                id: 3,
                question: "What is advanced loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 4,
                question: "How to use advanced loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            }, 
            {
                id: 2,
                question: "What is loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            }
        ],
        "Payments on Loop": [
            {
                id: 5,
                question: "What is advanced loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 6,
                question: "How to use advanced loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            }
        ],
        "Shipping on Loop": [
            {
                id: 7,
                question: "What is advanced loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            },
            {
                id: 8,
                question: "How to use advanced loop",
                answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque rerum dolore perferendis inventore rem quas, vel, ad, quaerat ullam provident enim. Sapiente quae voluptas tenetur qui sequi totam sunt porro?"
            }
        ]
    };
    
    return (
        <>
            <div className="bg-white flex justify-center items-center">
                <div className="max-w-[80rem]">
                    <div className="grid lg:grid-cols-1 xsm:grid-cols-1">
                        {/*HEADER */}
                        <div className="xsm:p-5">
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
                        <div className="flex flex-row gap-5 mt-7 xsm:p-3 lg:p-0">
                            <div className='lg:flex lg:flex-col max-w-[15rem] leading-relaxed text-lg font-normal text-gray-700 xsm:p-5 xsm:hidden'>
                                <a href="#Getting Started with Loop" className='text-gray-800 block border-gray-600 border-l p-3'>Getting Started with Loop</a>
                                <a href="#Products on Loop" className='text-gray-800 block border-gray-600 border-l p-3'>Products on Loop</a>
                                <a href="#Payments on Loop" className='text-gray-800 block border-gray-600 border-l p-3'>Payments on Loop</a>
                                <a href="#Shipping on Loop" className='text-gray-800 block border-gray-600 border-l p-3'>Shipping on Loop</a>
                            </div>
                            
                            <div className="">
                                {Object.entries(gettingStartedFaq).map(([title, faqs]) => (
                                
                                    <div className="rounded-sm border shadow-xl max-w-[65rem] p-7 grid grid-cols-1 mb-4" id={title}>
                                        <div className="flex">
                                            <div key={title} className="mb-10">
                                                <p className="leading-relaxed text-2xl text-gray-800 font-bold">{title}</p>
                                                <div className="grid lg:grid-cols-2 xsm:grid-cols-1 gap-4 mt-8">
                                                    {faqs.map((faq) => (
                                                        <div className="leading-relaxed" key={faq.id}>
                                                            <p className="text-gray-800 text-lg font-medium">{faq.question}</p>
                                                            <p className="text-gray-600">{faq.answer}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <a className='btn text-white bg-[#885b56] hover:bg-[#885b56] mt-6 w-full text-center leading-relaxed'>Did this answer your question? <button className='border p-1 hover:bg-[#684440]'>Yes</button><button className='border p-1 hover:bg-[#684440]'>No</button></a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>    
                </div>                
            </div>
        </>
    )
}