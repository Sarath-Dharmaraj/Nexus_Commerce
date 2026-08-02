import { useLoaderData, useNavigate } from "react-router-dom";

function ProductCard() {
  // hooks
  const nav = useNavigate();
  const data = useLoaderData();

  return (
    <div className="px-8 py-6 bg-white w-full h-full font-hanken tracking-tight text-slate-600">
      <div className="w-full flex flex-col items-start justify-around gap-5">
        {/* navigator */}
        <div className="flex items-start justify-around gap-4 capitalise text-slate-800 tracking-wider">
          <span
            className="hover:font-black hover:underline cursor-pointer"
            onClick={() => nav("/home")}
          >
            Home
          </span>
          <span className="">{">"}</span>
          <span className="hover:font-black hover:underline cursor-pointer">
            Electronics
          </span>
          <span className="">{">"}</span>
          <span className="font-black cursor-pointer">ProductName</span>
        </div>

        {/* Product info section */}
        <div className="w-full flex items-center justify-around gap-2">
          {data.skuId}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
