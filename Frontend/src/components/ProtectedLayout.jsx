import { useLoaderData, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function ProtectedLayout() {
  const user = useLoaderData();
  return (
    <div className="font-hanken tracking-widest w-screen min-h-screen">
      <Navbar user={user} />
      <main>
        <Outlet context={user} />
      </main>
    </div>
  );
}

export default ProtectedLayout;
