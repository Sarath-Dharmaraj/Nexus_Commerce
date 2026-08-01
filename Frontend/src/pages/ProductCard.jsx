function ProductCard() {
  return (
    <div className="px-8 py-6 bg-white w-full h-full font-hanken tracking-tight text-slate-600">
      <div className="w-full flex flex-col items-start justify-around gap-5">
        <div className="flex items-start justify-around gap-4 capitalise text-slate-800 tracking-wider">
          <span className="hover:font-black">Home</span>
          <span className="">{">"}</span>
          <span className="hover:font-black">Electronics</span>
          <span className="">{">"}</span>
          <span className="font-black">ProductName</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
