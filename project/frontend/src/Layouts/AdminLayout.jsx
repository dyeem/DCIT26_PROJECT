import { Outlet } from "react-router-dom";
import Navbar from "../Components/Admin/Components/Navbar";
import Header from "../Components/Admin/Components/Header";

export default function AdminLayout() {
  return (
    <>
      <header className="">
        <Navbar/>
      </header>
      <body className="flex flex-col bg-[#e2e3ec] bg-puzzle-pattern font-poppins">
        <Header/>
        <Outlet />
      </body>
      <footer>
        <p>Copyright &copy; 2023</p>
      </footer>
    </>
  )
}
