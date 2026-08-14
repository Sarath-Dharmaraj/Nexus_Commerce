import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/protectedPageComp/Navbar";

function ProtectedLayout() {
  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  return (
    <div className="relative font-hanken tracking-widest w-full h-screen overflow-hidden flex flex-col">
      <Navbar />
      <main ref={mainRef} className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
