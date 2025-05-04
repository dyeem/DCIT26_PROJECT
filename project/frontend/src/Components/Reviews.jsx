import avatar from '../Assets/avatar.jpg';
import p1 from '../Assets/Reviews Pictures/p1.jpg';
import p3 from '../Assets/Reviews Pictures/p2.jpg';
import p2 from '../Assets/Reviews Pictures/p3.jpg';
import p4 from '../Assets/Reviews Pictures/p4.jpg';
import file from '../Assets/file-icon.png'

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

export default function Reviews() {

    const [popUp, setPopUp] = useState(false)
    const [reviews, setReviews] = useState(
        [
            {
                name: "Shehanna Marie Aquino",
                rating: 5,
                text: "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
                img: avatar,
            },
            {
                name: "Sophia Martinez",
                rating: 5,
                text: "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
                img: p1,
            },
            {
                name: "Lila Anderson",
                rating: 5,
                text: "I absolutely love the craftsmanship of their crochet pieces! Each item feels so unique and made with care—truly a work of art!",
                img: p2,
            },
            {
                name: "Ethan Carter",
                rating: 4,
                text: "The quality and attention to detail are outstanding. I’ve received so many compliments on my crochet piece, and I can’t wait to order more!",
                img: p3,
            },
            {
                name: "Clara Reyes",
                rating: 3,
                text: "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
                img: p4,
            },
        ]
    )
    const [formData, setFormData] = useState({
        name: '',
        rating: '',
        text: '',
        img: null,
      });

      const handleFormSubmit = () => {
        // Validate inputs (optional)
        if (!formData.name || !formData.rating || !formData.text) {
          alert('Please fill in all fields!');
          return;
        }
      
        const newReview = {
          name: formData.name,
          rating: Number(formData.rating),
          text: formData.text,
          img: formData.img || avatar, // Fallback to default avatar if no image is uploaded
        };
      
        setReviews([...reviews, newReview]);
        setFormData({ name: '', rating: '', text: '', img: null }); // Reset form
        setPopUp(false); // Close popup
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setFormData((prev) => ({ ...prev, img: reader.result }));
          };
          reader.readAsDataURL(file);
        }
      };
      

    return (
        <>
            <section className="flex items-center justify-center min-h-screen bg-white  ">
                <div className="max-w-[85rem] w-full pl-5 pr-6">
                    {/* Header */}
                    <div className="text-center lg:mb-8 lg:p-6">
                        <h2 className="lg:text-5xl leading-relaxed xsm:text-3xl font-serif mb-2 text-black">Customer Reviews</h2>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="shadow-2xl rounded-xl p-5">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                            {/* Left Section */}
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="text-yellow-500 text-2xl flex">★★★★☆</div>
                                    <span className="ml-2 text-gray-600 text-sm">Based on 1624 reviews</span>
                                </div>
                                {[5, 4, 3, 2, 1].map((rating, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <span className="text-sm text-gray-700 w-8">{rating} ★</span>
                                        <div className="bg-gray-300 h-2 flex-1 mx-2 rounded">
                                            <div
                                                className="bg-yellow-500 h-full rounded"
                                                style={{ width: `${[63, 10, 6, 12, 9][index]}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-700">
                                            {[63, 10, 6, 12, 9][index]}%
                                        </span>
                                    </div>
                                ))}
                                <button onClick={() => setPopUp(true)} className="mt-4 w-full px-4 py-2 bg-white text-gray-700 border border-yellow-600 rounded hover:bg-yellow-400 hover:text-white">
                                    Write a review
                                </button>
                            </div>
                            {/* Right Section - Reviews */}
                            <div className="lg:col-span-2 space-y-8">
                                {reviews.map((review, index) => (
                                    <div key={index} className="space-y-4">
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={review.img}
                                                alt={review.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <div className="flex items-center">
                                                    <h3 className="font-semibold text-black">{review.name}</h3>
                                                    <div className="ml-2 text-yellow-500 flex text-sm">
                                                        {"★".repeat(review.rating)}
                                                        {"☆".repeat(5 - review.rating)}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mt-1 leading-relaxed">
                                                    {review.text}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Add the horizontal rule here */}
                                        {index < 4 && (
                                            <hr className="border-t-1 border-yellow-500 my-6" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Dialog open={popUp} onClose={() => setPopUp(false)} className="relative z-50 font-serif">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-20" />
                {/* Panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4 text-gray-900">
                    <DialogPanel className="w-full max-w-4xl p-6 bg-white rounded shadow-lg">
                        <div className="flex flex-row gap-x-4 justify-center items-center">
                            <DialogTitle className="text-5xl font-semibold text-gray-800">Write A Review!</DialogTitle>
                        </div>
                        <div className="xl:px-15 mt-4 xsm:px-4">
                            <div className="flex flex-col items-start w-full">
                                <p className="text-left text-lg font-semibold">Name:</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="rounded-2xl w-full"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <p className="text-left text-lg font-semibold">Stars:</p>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    className="rounded-2xl w-full"
                                    placeholder="Rating (1-5)"
                                />
                            </div>
                            <div>
                                <p className="text-left text-lg font-semibold">Message:</p>
                                <textarea
                                    name="text"
                                    value={formData.text}
                                    onChange={handleInputChange}
                                    className="w-full rounded-2xl"
                                    placeholder="Write Here a Review"
                                ></textarea>
                                </div>
                            <div>
                                <p className="text-lg font-semibold mb-2 text-left">Your Picture:</p>
                                <div className="border-4 border-dashed border-gray-500 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-200">
                                    <div className="flex items-center justify-center">
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <img src={formData.img || file} alt="Preview" className="size-14" />
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                    </div>
                                    <p className="mt-2">
                                    Drag and Drop or Upload Your Picture Here <span className="underline">browse</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-yellow-400 text-white px-4 py-2 rounded-2xl mt-4"
                                    onClick={handleFormSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
