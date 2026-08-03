import { useLoaderData, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function ProtectedLayout() {
  const user = useLoaderData();
  return (
    <div className="relative font-hanken tracking-widest w-full h-screen overflow-hidden flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={user} />
      </main>
    </div>
  );
}

export default ProtectedLayout;
