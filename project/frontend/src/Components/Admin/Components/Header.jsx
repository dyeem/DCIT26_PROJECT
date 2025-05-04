import merce from '../../../Assets/OurTeam/merce.jpg'
export default function Header() {
    return (
      <div className="z-1 fixed flex items-center bg-[#faf9f9] w-full py-6 px-6 shadow-sm pl-[18rem]">
        <div className="flex flex-row justify-between items-center w-full">
            <p className="text-gray-700 text-2xl font-semibold">Dashboard</p>
            <div className="flex flex-row items-center gap-x-3">
                <p className='text-gray-700 font-semibold'>John Mark</p>
                <div className="">
                    <img src={merce} alt="admin img" className='w-12 h-12 rounded-full object-cover' />
                </div>
            </div>
        </div>
      </div>
    );
  }
  