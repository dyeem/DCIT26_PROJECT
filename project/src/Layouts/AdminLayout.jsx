import { Outlet } from "react-router-dom";
import Navbar from "../Components/Admin/Components/Navbar";

export default function AdminLayout() {
  return (
    <>
      <header className="bg-transparent">
        <Navbar/>
      </header>
      <body className="bg-puzzle-pattern bg-[#f5f5f5] min-h-screen">
        <Outlet />
      </body>
      <footer>
        <p>Copyright &copy; 2023</p>
      </footer>
    </>
  )
}
