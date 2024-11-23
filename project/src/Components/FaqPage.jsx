import { useState } from 'react';
import faq from '../Assets/faq.png';

export default function FaqPage() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (title) => {
        setOpenSection(openSection === title ? null : title);
    };

    const gettingStartedFaq = {
        "Getting Started with Loop": [
            {
                id: 1,
                question: "What is Loop?",
                answer: "Loop is a platform that helps you manage tasks efficiently and effectively, streamlining workflows.",
            },
            {
                id: 2,
                question: "How do I get started?",
                answer: "To get started, sign up for an account and follow the setup instructions provided.",
            },
        ],
        "Products on Loop": [
            {
                id: 3,
                question: "What are the available products?",
                answer: "Loop offers various tools like task management, file sharing, and collaborative workspaces.",
            },
            {
                id: 4,
                question: "Are there product tutorials?",
                answer: "Yes, we provide tutorials and guides to help you make the most of our products.",
            },
        ],
        "Payments on Loop": [
            {
                id: 5,
                question: "What payment methods are accepted?",
                answer: "We accept credit cards, PayPal, and other popular payment methods.",
            },
            {
                id: 6,
                question: "Can I get a refund?",
                answer: "Refunds are available within the first 30 days of purchase if you're not satisfied.",
            },
        ],
        "Shipping on Loop": [
            {
                id: 7,
                question: "Do you offer international shipping?",
                answer: "Yes, we ship to most countries worldwide.",
            },
            {
                id: 8,
                question: "How long does shipping take?",
                answer: "Shipping times vary based on location but typically range from 5 to 10 business days.",
            },
        ],
    };

    return (
        <>
            <div className="bg-white flex justify-center items-center">
                <div className="max-w-[80rem]">
                    <div className="grid lg:grid-cols-1 xsm:grid-cols-1">
                        {/* HEADER */}
                        <div className="xsm:p-5">
                            <div className="grid lg:grid-cols-2 xsm:grid-cols-1">
                                {/* Intro */}
                                <div className="text-left leading-relaxed place-self-center">
                                    <p className="lg:text-5xl xsm:text-4xl text-black font-serif mb-8">Loop FAQ</p>
                                    <p className="text-gray-700 text-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum qui iure minus laboriosam laudantium vero, explicabo quam perferendis impedit quos quae deleniti maxime quia consectetur aliquid earum ratione in culpa.
                                    </p>
                                </div>
                                {/* Image */}
                                <div>
                                    <img src={faq} alt="" className="lg:w-[40rem] lg:h-auto" />
                                </div>
                            </div>
                        </div>
                        {/* QUESTIONS */}
                        <div className="flex flex-row gap-5 mt-7 xsm:p-3 lg:p-0">
                            {/* Sidebar for larger screens */}
                            <div className="lg:flex lg:flex-col max-w-[15rem] leading-relaxed text-lg font-normal text-gray-700 xsm:p-5 xsm:hidden">
                                {Object.keys(gettingStartedFaq).map((title) => (
                                    <a
                                        key={title}
                                        href={`#${title.replace(/\s+/g, '-')}`}
                                        className="text-gray-800 block border-gray-600 border-l p-3"
                                    >
                                        {title}
                                    </a>
                                ))}
                            </div>
                            {/* Accordion Sections */}
                            <div>
                                {Object.entries(gettingStartedFaq).map(([title, faqs]) => (
                                    <div
                                        key={title}
                                        id={title.replace(/\s+/g, '-')}
                                        className="rounded-sm border shadow-xl max-w-[65rem] p-7 grid grid-cols-1 mb-4"
                                    >
                                        <div className="flex">
                                            <div className="w-screen">
                                                {/* Accordion Header */}
                                                <button
                                                    onClick={() => toggleSection(title)}
                                                    className="lg:text-2xl xsm:text-2xl text-gray-800 lg:font-bold xsm:font-medium w-full flex justify-between items-center lg:hidden text-left"
                                                >
                                                    {title}
                                                    <span className="text-gray-500">
                                                        {openSection === title ? '-' : '+'}
                                                    </span>
                                                </button>

                                                {/* Expanded view for larger screens */}
                                                <p className="hidden lg:block leading-relaxed text-2xl text-gray-800 lg:font-bold mb-4">
                                                    {title}
                                                </p>

                                                {/* FAQ Items */}
                                                {(openSection === title || window.innerWidth >= 1024) && (
                                                    <div className="grid lg:grid-cols-2 xsm:grid-cols-1 gap-4 mt-8">
                                                        {faqs.map((faq) => (
                                                            <div key={faq.id} className="leading-relaxed">
                                                                <p className="text-gray-800 text-lg font-medium">{faq.question}</p>
                                                                <p className="text-gray-600">{faq.answer}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Feedback Buttons */}
                                                {(openSection === title || window.innerWidth >= 1024) && (
                                                    <div className="flex w-full">
                                                        <a className="btn text-white bg-[#885b56] hover:bg-[#885b56] mt-6 lg:w-full text-center leading-relaxed">
                                                            Did this answer your question?{' '}
                                                            <button className="border p-1 hover:bg-[#684440]">Yes</button>
                                                            <button className="border p-1 hover:bg-[#684440]">No</button>
                                                        </a>
                                                    </div>
                                                )}
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
    );
}
