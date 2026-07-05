import HeaderMerch from "../components/merchComp/HeaderMerch";
import Sidebar from "../components/merchComp/Sidebar";

function Merchant() {
  return (
    <div className="w-screen h-screen font-hanken tracking-tight">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col h-screen w-full">
          <HeaderMerch />
        </div>
      </div>
    </div>
  );
}

export default Merchant;
