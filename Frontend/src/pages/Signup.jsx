function Signup() {
  return (
    // background frame
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center font-sans">
      {/* Maintainer frame: Added flex-col and overflow-hidden */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl min-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left Column: Hero Image Frame */}
          <div className="w-full md:w-1/2 bg-[url('C:\\Users\\acer\\Documents\\Projects\\Nexus_Commerce\\Frontend\\src\\assets\\login_image.png')] bg-cover bg-center bg-no-repeat flex flex-col items-start justify-center gap-y-14 p-10">
            <h1 className="text-5xl font-bold text-white">
              Join the modern <br />
              <span className="text-green-500">marketplace</span>
            </h1>
            <p className="text-white text-l max-w-md">
              Experience Institutional-grade Commerce. Scale your business or
              shop curated luxury with frictionless financial operations and
              razor-sharp precision.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2 w-md">
              {[
                ["DATA SECURITY", "256-bits AES"],
                ["NETWORK SPEED", "40ms Latency"],
              ].map((val, index) => (
                <div
                  key={index}
                  className="col-span-1 border-l-2 border-green-500 pl-4"
                >
                  <p className="text-green-500 text-[10px] font-bold tracking-widest uppercase mb-1">
                    {val[0]}
                  </p>
                  <p className="text-white text-sm font-medium">{val[1]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sign Up Details MAIN */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <p className="text-gray-400 border border-dashed border-gray-300 p-4 rounded text-center">
              will update this grid
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div class="fixed bottom-0 px-5 w-full flex pt-2 mt-2 border-t border-slate-50">
        {/* brand and link */}
        <div className="flex flex-1 items-end justify-around text-xs text-slate-700">
          {/*Brand */}
          <div className="flex flex-col">
            <p className="font-semibold ">Nexus Commerce &nbsp;</p>
            <p className="text-slate-500">Institutional Confidence.</p>
          </div>

          {/* Links */}
          <div className="flex items-center justify-end gap-5 text-xs font-medium text-slate-600">
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline"
            >
              Merchant Agreement
            </a>
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline"
            >
              Investor Relations
            </a>
          </div>
        </div>

        {/* Copy Rights */}
        <div className="flex flex-col flex-1 md:flex-row items-end justify-end text-[10px] text-slate-500">
          <p>&copy; 2026 Nexus Commerce.&nbsp;</p>
          <p>Institutional Confidence.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
