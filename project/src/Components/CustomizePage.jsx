import pic from '../Assets/customized_picture.png'
import file from '../Assets/file-icon.png'
import calendar from '../Assets/calendar-icon.png'

export default function CustomizePage() {
    return (
        <>
            <div className="flex justify-center items-center bg-white text-gray-800 w-full">
                <div className="rounded-md shadow-md p-4 w-[90rem]">
                    <div className="flex flex-row justify-center items-center">
                        <img src={pic} alt="" className='h-[35rem]'/>
                        <div className="flex flex-col text-center w-full p-3">
                            <p className='text-5xl font-serif text-violet-900 mb-3'>Customize Order Request</p>
                            <div className="flex flex-row items-center gap-x-14 px-10">
                                <hr className='border-1 border-gray-400 w-full'/>
                                <p className='font-serif text-violet-700 text-nowrap'>Contact Information</p>
                                <hr className='border-1 border-gray-400 w-full'/>
                            </div>
                            {/* FORM */}
                            <div className="mx-24 mt-4">
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
                                    <div className="border-4 border-dashed border-gray-500 rounded-2xl p-6 flex flex-col items-center justify-center">
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
                                        <button className="bg-purple-700 text-white px-4 py-2 rounded-2xl mt-4">Submit</button>
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