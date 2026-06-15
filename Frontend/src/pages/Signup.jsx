import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import {
  PiEyeLight,
  PiEyeSlash,
  PiStorefrontBold,
  PiArrowCircleRightBold,
  PiGoogleLogoBold,
  PiAppleLogoBold,
  PiWarningFill,
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
    <div className="h-screen w-full tracking-wider bg-gray-200 flex items-center justify-center font-sans p-4 md:p-8 md:pb-20 lg:pb-14 overflow-hidden">
      {/* WARNING BANNER */}
      {isError && (
        <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-wider w-[90%] sm:w-full max-w-md p-2 border shadow-2xl rounded-lg  border-gray-500 flex flex-col gap-2 bg-white">
          <div className="flex items-center justify-between px-2">
            <PiWarningFill className="font-bold text-2xl text-yellow-600" />
            <button
              onClick={() => setError(false)}
              className="self-end font-bold text-gray-600 hover:text-black"
            >
              X
            </button>
          </div>
          <div className="h-px bg-black "></div>
          <div className="px-2 font-semibold text-red-600">
            {actionData.errorType === "VALIDATION_ERROR"
              ? "Validation Error"
              : "Server Error"}
            :
          </div>
          <div className="px-2">{actionData?.message}</div>
        </div>
      )}

      {/* Main Card Frame */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl h-full max-h-[187.5] flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row flex-1 h-full">
          {/* Left Column: Hero Image Frame */}
          <div className="w-full md:w-5/12 lg:w-1/2 h-full bg-[url('C:\\Users\\acer\\Documents\\Projects\\Nexus_Commerce\\Frontend\\src\\assets\\login_image.png')] bg-cover bg-center bg-no-repeat hidden md:flex flex-col items-start justify-center gap-y-6 lg:gap-y-10 p-8 lg:p-12 xl:p-16">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Join the modern <br />
              <span className="text-green-500">marketplace</span>
            </h1>
            <p className="text-white text-xs lg:text-sm max-w-md">
              Experience Institutional-grade Commerce. Scale your business or
              shop curated luxury with frictionless financial operations and
              razor-sharp precision.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2 w-full max-w-md">
              {[
                ["DATA SECURITY", "256-bits AES"],
                ["NETWORK SPEED", "40ms Latency"],
              ].map((val, index) => (
                <div
                  key={index}
                  className="col-span-1 border-l-2 border-green-500 pl-3"
                >
                  <p className="text-green-500 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase mb-0.5">
                    {val[0]}
                  </p>
                  <p className="text-white text-xs lg:text-sm font-medium">
                    {val[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sign Up Details MAIN */}
          <div className="w-full md:w-7/12 lg:w-1/2 h-full px-6 sm:px-12 md:px-8 lg:px-16 xl:px-24 flex flex-col justify-center gap-y-2 lg:gap-y-3 py-4">
            <div className="flex flex-col gap-y-0.5 lg:gap-y-1">
              <h1 className="text-base lg:text-lg font-semibold text-gray-800">
                Nexus Commerce
              </h1>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                Create your account
              </p>
              <p className="text-xs lg:text-sm text-slate-600">
                Already have an account?&nbsp;
                <a
                  href="#"
                  className="text-blue-600 font-semibold underline hover:no-underline"
                >
                  Sign in
                </a>
              </p>
            </div>

            <Form method="post">
              <div className="space-y-1.5 lg:space-y-2.5 mt-1">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[10px] lg:text-xs font-semibold text-gray-500 tracking-widest uppercase mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="John Doe"
                    required
                    className="w-full px-3 py-1.5 text-sm tracking-wide capitalize border rounded border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] lg:text-xs font-semibold text-gray-500 tracking-widest uppercase mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="johndoe1991@gmail.com"
                    required
                    className="w-full px-3 py-1.5 text-sm tracking-wide border rounded border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-[10px] lg:text-xs font-semibold text-gray-500 tracking-widest uppercase mb-1"
                  >
                    Password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3 py-1.5 text-sm tracking-wide border rounded border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setVisible(!isVisible)}
                      className="absolute right-3 text-lg text-gray-500 hover:text-black"
                    >
                      {isVisible ? <PiEyeLight /> : <PiEyeSlash />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center border rounded-md border-blue-200 bg-blue-50/50 py-1.5 px-3 mt-2">
                  <div className="flex items-center justify-between gap-x-2 w-fit">
                    <PiStorefrontBold className="text-xl lg:text-2xl text-blue-600" />
                    <div>
                      <p className="font-semibold text-xs lg:text-sm text-gray-900">
                        Merchant Account
                      </p>
                      <p className="text-[9px] lg:text-[10px] text-gray-500 leading-tight">
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
                    <div className="relative flex items-center w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0.5] after:left-[0.5] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="mt-2 lg:mt-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full gap-2 py-2 text-sm font-semibold text-white bg-green-700 hover:bg-green-800 transition-colors rounded"
                  >
                    Creating Account{" "}
                    <PiArrowCircleRightBold className="text-lg" />
                  </button>
                </div>
              </div>
            </Form>

            <div className="flex items-center gap-x-3 my-1 lg:my-2">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="tracking-widest text-[9px] lg:text-[10px] font-semibold text-gray-400">
                OR CONTINUE WITH
              </p>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="flex items-center justify-between gap-x-3 lg:gap-x-4">
              <button
                type="button"
                className="flex items-center justify-center flex-1 gap-x-2 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-white hover:text-black bg-red-600 hover:bg-gray-50 border hover:border-black rounded transition-colors"
              >
                <PiGoogleLogoBold className="text-base" /> Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center flex-1 gap-x-2 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-white hover:text-black bg-black hover:bg-white border hover:border-black rounded transition-colors"
              >
                <PiAppleLogoBold className="text-base" /> Apple
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 px-4 md:px-6 w-full hidden md:flex items-center justify-between py-2 bg-gray-100 border-t border-gray-300 z-10">
        {/* Left side: Brand + Links */}
        <div className="flex items-center gap-3 lg:gap-8">
          <p className="font-semibold text-[10px] lg:text-xs text-slate-700 whitespace-nowrap md:tracking-tighter lg:tracking-normal">
            Nexus Commerce
          </p>
          <div className="flex items-center gap-3 lg:gap-5 text-[10px] lg:text-xs font-medium text-slate-600">
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline whitespace-nowrap md:tracking-tighter lg:tracking-normal"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline whitespace-nowrap md:tracking-tighter lg:tracking-normal"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline whitespace-nowrap md:tracking-tighter lg:tracking-normal"
            >
              Merchant Agreement
            </a>
            <a
              href="#"
              className="hover:text-slate-900 transition-colors underline hover:no-underline whitespace-nowrap md:tracking-tighter lg:tracking-normal"
            >
              Investor Relations
            </a>
          </div>
        </div>

        {/* Right side: Copyright */}
        <div className="flex items-center text-[9px] lg:text-[10px] text-slate-500 whitespace-nowrap pl-4 md:tracking-tighter lg:tracking-normal">
          <p>&copy; 2026 Nexus Commerce. Institutional Confidence.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
