/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useLoaderData, Form, Link } from "react-router-dom";

import { MdMoreVert } from "react-icons/md";

import AddressList from "../components/profileComp/AddressList";

function Checkout() {
  const { address } = useLoaderData();

  const primeAddress = address?.find((a) => a.isPrimary) || address?.[0] || {};

  const [defaultAddress, setDefaultAddress] = useState({});
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => setDefaultAddress(() => primeAddress), [primeAddress]);

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-slate-800 text-sm";
  const labelClass =
    "block text-xs font-semibold text-slate-600 tracking-wider mb-1";

  return (
    <div className="w-full text-slate-600 font-hanken tracking-tight">
      {isListOpen && (
        <AddressList
          addresses={address}
          setDefaultAddress={setDefaultAddress}
          isOpen={isListOpen}
          onClose={() => setIsListOpen(false)}
        />
      )}
      <div className="bg-white border border-slate-200 rounded-lg p-6 w-full shadow-sm">
        <div className="w-full flex items-center justify-between">
          <div className="mb-4">
            <h2 className="text-3xl font-black text-slate-800 mb-2">
              Shipping Information
            </h2>
            <p className="text-slate-500 text-sm tracking-wide">
              Enter your delivery details below.
            </p>
          </div>
          <div
            className="p-2 text-2xl border rounded-md border-slate-200"
            onClick={() => setIsListOpen(!isListOpen)}
          >
            <MdMoreVert />
          </div>
        </div>

        <Form method="post" className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                name="street"
                defaultValue={defaultAddress.street}
                placeholder="123 Commerce St"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                name="suite"
                defaultValue={defaultAddress.suite}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={defaultAddress.city}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  defaultValue={defaultAddress.zipCode}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className={labelClass}>State / Province</label>
                <input
                  type="text"
                  name="state"
                  defaultValue={defaultAddress.state}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  name="country"
                  defaultValue={defaultAddress.country}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/cart"
              className="text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              &larr; Return to Cart
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-black hover:bg-slate-800 text-white font-bold rounded-md text-sm transition-colors shadow-sm"
            >
              Continue to Payment
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Checkout;
