import pic from '../Assets/customized_picture.png'
import file from '../Assets/file-icon.png'
import calendar from '../Assets/calendar-icon.png'
import attention from '../Assets/attention-icon.png'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'


export default function CustomizePage() {
    const [popUp, setPopup] = useState(false)

    return (
        <>
            <div className="flex justify-center items-center bg-[white] text-gray-800 w-full font-serif py-4 ">
                <div className="rounded-md shadow-xl p-0 w-[90rem] bg-[#c29076]">
                    <div className="flex flex-row justify-center items-center bg-[#c29076]">
                        <img src={pic} alt="" className='h-[45rem] sm:hidden xsm:hidden xl:block'/>
                        <div className="flex flex-col text-center w-full p-3">
                            <p className='xsm:text-3xl xl:text-5xl font-serif text-violet-900 mb-3 xsm:mt-4'>Customize Order Request</p>
                            <div className="flex flex-row items-center xsm:gap-x-4 xl:gap-x-14 xl:px-10">
                                <hr className='border-2 border-white-400 w-full'/>
                                <p className='font-serif text-violet-700 text-nowrap'>Contact Information</p>
                                <hr className='border-2 border-white-400 w-full'/>
                            </div>
                            {/* FORM */}
                            <div className="xl:mx-24 mt-4 xsm:px-4">
                                <div className="flex flex-col items-start">
                                    <p className='text-left text-lg font-semibold '>Name:</p>
                                    <input type="text" className='rounded-2xl w-full' placeholder='Name'/>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <div className="flex flex-col items-start">
                                        <p className='text-left text-lg font-semibold '>Email:</p>
                                        <input type="email" className='rounded-2xl w-full' placeholder='Email'/>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <p className='text-left text-lg font-semibold'>Deadline:</p>
                                        <div className="relative w-full">
                                            <input 
                                            type="date" 
                                            className='rounded-2xl w-full py-2 bg-white' 
                                            placeholder='MM/DD/YYYY'
                                            />
                                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                                <img src={calendar} alt="" className='size-8'/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className='text-left text-lg font-semibold '>Item Description:</p>
                                    <textarea name="" id="" className='w-full rounded-2xl' placeholder='Ex. Blue rose, with purple a leaf in a brown pot'></textarea>
                                </div>
                                <div className="">
                                    <p className="text-lg font-semibold mb-2 text-left">Reference Image:</p>
                                    <div className="border-4 border-dashed border-gray-500 rounded-2xl p-6 flex flex-col items-center justify-center bg-[#d3a683]">
                                        <div className="flex items-center justify-center">
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <img src={file} alt="" className='size-14'/>
                                            </label>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    console.log(e.target.files);
                                                }}
                                            />
                                        </div>
                                        <p className="mt-2">
                                            Drag & drop a file or <p className="underline">browse</p>
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm  mt-2">Add at least 3 reference images</p>
                                        <button 
                                            className="bg-purple-700 text-white px-4 py-2 rounded-2xl mt-4"
                                            onClick={(e) => setPopup(true)}
                                            >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={popUp} onClose={() => setPopup(false)} className="relative z-50 font-serif">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-20" />
                {/* Panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-4xl p-6 bg-white rounded shadow-lg">
                        <div className="flex flex-row gap-x-4 justify-center items-center">
                            <img src={attention} alt="" className='size-16'/>
                            <DialogTitle className="text-5xl font-semibold text-gray-800">Attention!</DialogTitle>
                            <img src={attention} alt="" className='size-16'/>
                        </div>
                        <div className="text-gray-900">
                            <p className="mt-2 text-lg mb-6">By submitting this request, you agree to the following:</p>
                            <div className="text-lg px-5">
                                <li>You will allow the seller some time to reply to your inquiry or commission.</li>
                                <li>Upon approval of the commission, an upfront payment of 50% is required.</li>
                                <li>The seller will provide regular updates on the progress of your order.</li>
                                <li>Major changes requested after approval may incur additional charges.</li>
                                <li>The final payment is required upon completion and prior to the item’s delivery.</li>
                                <li>The seller retains the right to showcase the commissioned item in their portfolio or promotional materials.</li>
                                <li>Cancellations after the initial payment are non-refundable unless agreed upon by the seller.</li>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-row justify-between">
                            <div className="">
                                <input type="checkbox" name="" id="check" className='mr-2'/>
                                <label htmlFor="check" className='text-gray-900'>I agree to the following terms and conditions.</label>
                            </div>
                            <button
                                className="px-4 py-2 text-white bg-[#885b56] rounded-2xl"
                                onClick={() => setPopup(false)}
                            >
                                Submit
                            </button>  
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}