export default function Header() {
    return (
      <div className="z-1 fixed flex items-center bg-[#faf9f9] w-full py-6 px-6 shadow-md pl-[18rem]">
        <div className="flex flex-row justify-between items-center w-full">
            <p className="text-gray-700 text-2xl font-semibold">Dashboard</p>
            <div className="flex flex-row items-center gap-x-4">
                <p>Admin Name</p>
                <img src="" alt="admin img" />
                <img src="" alt="admin status" />
            </div>
        </div>
      </div>
    );
  }
  