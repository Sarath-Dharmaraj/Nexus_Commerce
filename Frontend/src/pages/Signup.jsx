import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import {
  PiEyeLight,
  PiEyeSlash,
  PiStorefrontBold,
  PiArrowCircleRightBold,
  PiGoogleLogoBold,
  PiAppleLogoBold,
} from "react-icons/pi";

function Signup() {
  const [isVisible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(true);
    }
  }, [actionData]);

  return (
    // background frame
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center font-sans">
      {/* WARNING BANNER */}
      {isError && (
        <div className="absolute left-1/2 top-1/2 text-red-700 w-xl flex flex-com">
          <button onClick={() => setError(false)}>X</button>
          <div>Server Error: {actionData.message}</div>
        </div>
      )}

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
          <div className="w-full md:w-1/2 px-28 flex flex-col justify-center gap-y-3">
            <div className="flex flex-col gap-y-3">
              <h1 className="text-xl font-semibold">Nexus Commerce</h1>
              <p className="text-4xl font-semibold">Create your account</p>
              <p className="text-slate-700">
                Already have an account?&nbsp;
                <a
                  href="#"
                  className="text-blue-700 font-semibold underline hover:no-underline"
                >
                  Sign in
                </a>
              </p>
            </div>
            <Form method="post">
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-gray-600 tracking-widest"
                  >
                    Full Name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="John doe"
                    required
                    className="w-full px-3 py-1 tracking-widest capitalize border rounded-l border-slate-400 hover:border-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-600 tracking-widest"
                  >
                    Email
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="johndoe1991@gmail.com"
                    required
                    className="w-full px-3 py-1 tracking-widest border rounded-l border-slate-400 hover:border-black"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="text-gray-600 tracking-widest"
                  >
                    Password
                  </label>
                  <br />
                  <div className="flex items-center">
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3 py-1 tracking-widest border rounded-l border-slate-400 hover:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVisible(!isVisible);
                      }}
                      className="absolute right-5 text-xl"
                    >
                      {isVisible ? <PiEyeLight /> : <PiEyeSlash />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center border rounded-md border-blue-400 py-2 px-4">
                  <div className="flex items-center justify-between gap-x-3 w-fit">
                    <PiStorefrontBold className="text-3xl text-blue-700" />
                    <div>
                      <p className="font-semibold">Merchant Account</p>
                      <p className="text-xs text-slate-600">
                        I want to sell products on Nexus
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center justify-end flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isMerchant"
                      value="true"
                      className="sr-only peer"
                    />

                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.5] after:left-[0.5] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-around text-white w-full py-2 bg-green-700">
                  <button type="submit" className="flex items-center">
                    Creating Account <PiArrowCircleRightBold />
                  </button>
                </div>
              </div>
            </Form>
            <div className="flex items-center gap-x-4">
              <div className="h-px bg-gray-400 flex-1"></div>
              <p className="tracking-widest text-slate-600">OR CONTINUE WITH</p>
              <div className="h-px bg-gray-400 flex-1"></div>
            </div>
            <div className="flex items-center justify-between gap-x-5">
              <button
                type="button"
                className="flex items-center justify-center text-white hover:text-black bg-red-600 hover:bg-gray-200 gap-x-1 border border-gray-300 rounded-l  py-2 flex-1"
              >
                <PiGoogleLogoBold /> Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center text-white hover:text-black bg-black hover:bg-gray-200 gap-x-1 border border-gray-300 rounded-l py-2 flex-1"
              >
                <PiAppleLogoBold /> Apple
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 px-5 w-full flex pt-2 mt-2 border-t border-slate-50">
        {/* brand and link */}
        <div className="flex flex-1 items-end justify-around text-xs text-slate-700">
          {/*Brand */}
          <div className="flex flex-col">
            <p className="font-semibold ">Nexus Commerce</p>
            <p className="text-slate-500"></p>
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
