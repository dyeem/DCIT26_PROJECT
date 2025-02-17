
export default function AdminDashboard() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="ml-[19rem] mt-[7rem]  w-full flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-x-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 bg-[#faf8f8] shadow-lg rounded-lg">
              <p className="text-lg text-gray-500">TOTAL EARNINGS</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 bg-[#faf8f8] shadow-lg rounded-lg">
              <p className="text-lg text-gray-500">TOTAL ORDERS</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 bg-[#faf8f8] shadow-lg rounded-lg">
              <p className="text-lg text-gray-500">TOTAL CUSTOMERS</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 bg-[#faf8f8] shadow-lg rounded-lg">
              <p className="text-lg text-gray-500">TOTAL PRODUCTS</p>
            </div>
          </div>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  )
}
