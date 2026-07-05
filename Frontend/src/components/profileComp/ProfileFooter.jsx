function ProfileFooter() {
  return (
    <div className="col-span-5 row-span-1 px-4 py-5 flex flex-col md:flex-row items-center justify-around gap-4 md:gap-0 bg-white border rounded-2xl border-slate-200 shadow-sm">
      <div className="flex flex-col items-start justify-around tracking-tight">
        <span className="text-slate-800 font-bold">Nexus Commerce</span>
        <span className="text-slate-600">
          &copy; 2024 Nexus Commerce. Institutional Confidence
        </span>
      </div>
      <div className="flex justify-around text-sm text-slate-600 cursor-pointer capitalize flex-1">
        <div className="flex flex-col underline">
          <span className="hover:text-black">Privacy Policy</span>
          <span className="hover:text-black">Terms of service</span>
        </div>
        <div className="flex flex-col underline">
          <span className="hover:text-black">Merchant Agreement</span>
          <span className="hover:text-black">Investor Relation</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileFooter;
