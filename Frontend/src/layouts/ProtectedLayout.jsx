import { Outlet } from "react-router-dom";
import Navbar from "../components/protectedPageComp/Navbar";

function ProtectedLayout() {
  return (
    <div className="relative font-hanken tracking-widest w-full h-screen overflow-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
