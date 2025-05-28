import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Components/Admin/Components/Navbar";
import Header from "../Components/Admin/Components/Header";

export default function AdminLayout() {

  return (
    <>
      <header className="">
        <Navbar/>
      </header>
      <body className="bg-[#7E62FF] p-5 ">
        <div className="flex flex-col font-poppins rounded-xl bg-[#e2e3ec] bg-puzzle-pattern ml-[14rem] h-screen">
          <Header/>
          <Outlet />
        </div>
      </body>
    </>
  )
}
