function Footer() {
  return (
    <div className="col-span-5 row-span-1 px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between lg:justify-around gap-6 md:gap-4 lg:gap-0 bg-white border rounded-2xl border-slate-200 shadow-sm w-full">
      <div className="flex flex-col items-center md:items-start justify-around tracking-tight text-center md:text-left w-full md:w-auto">
        <span className="text-slate-800 font-bold text-base lg:text-lg">
          Nexus Commerce
        </span>
        <span className="text-slate-600 text-xs sm:text-sm mt-1 md:mt-0">
          &copy; 2024 Nexus Commerce. Institutional Confidence
        </span>
      </div>
      <div className="flex w-full md:w-auto justify-around md:justify-end lg:justify-around gap-2 md:gap-8 lg:gap-12 text-xs sm:text-sm text-slate-600 cursor-pointer capitalize flex-1 mt-4 md:mt-0">
        <div className="flex flex-col items-center md:items-start underline gap-2 md:gap-1">
          <span className="hover:text-black text-center md:text-left">
            Privacy Policy
          </span>
          <span className="hover:text-black text-center md:text-left">
            Terms of service
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start underline gap-2 md:gap-1">
          <span className="hover:text-black text-center md:text-left">
            Merchant Agreement
          </span>
          <span className="hover:text-black text-center md:text-left">
            Investor Relation
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
