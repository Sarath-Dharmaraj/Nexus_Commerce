import { Form } from "react-router-dom";

import { useProfile } from "../../context/profileContext";
import { MdLocationPin } from "react-icons/md";

// component to add cards here

function AddAddress({ selectedItem }) {
  const { dispatch } = useProfile();
  const isEdit = !!selectedItem;
  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-around bg-black/30">
      {/* parent container */}
      <div className="flex flex-col items-center justify-around text-600 tracking-tight font-hanken w-150 py-4 bg-slate-50 border rounded-2xl border-slate-200 shadow-2xl">
        {/* title and close bar */}
        <div className="flex items-center justify-between w-full px-4 border-b border-slate-200">
          <span className="inline-flex items-center justify-around text-lg font-bold text-slate-800 ">
            <MdLocationPin className="self-center mx-2 text-slate-500" />
            Add a New Address
          </span>
          <span
            className="text-2xl text-slate-800 font-bold hover:text-black border border-slate-50 hover:border-slate-200 rounded-lg hover:bg-slate-100 px-2"
            onClick={() => {
              dispatch({ type: "CLOSE" });
            }}
          >
            x
          </span>
        </div>
        {/* list of cards */}
        <div className="flex flex-col items-start justify-around w-full px-14 py-8 text-slate-600 tracking-tight font-bold">
          <Form method="post" className="w-full flex flex-col gap-4">
            <input type="hidden" name="form_type" value="ADDRESS" />
            <input
              type="hidden"
              name="action_type"
              value={isEdit ? "EDIT" : "ADD"}
            />
            <input
              type="hidden"
              name="item_id"
              value={selectedItem?._id || ""}
            />

            {/* Street Address Row */}
            <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                name="street"
                id="street"
                required
                defaultValue={selectedItem?.street || ""}
                className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
              />
            </div>

            {/* Suite & Zip Code Row */}
            <div className="flex gap-4">
              <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
                <label htmlFor="suite">Suite / Apartment</label>
                <input
                  type="text"
                  name="suite"
                  id="suite"
                  required
                  defaultValue={selectedItem?.suite || ""}
                  className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
                />
              </div>

              <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  required
                  defaultValue={selectedItem?.zipCode || ""}
                  className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
                />
              </div>
            </div>

            {/* City & State Row */}
            <div className="flex gap-4">
              <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  defaultValue={selectedItem?.city || ""}
                  className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
                />
              </div>

              <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
                <label htmlFor="state">State / Province</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  required
                  defaultValue={selectedItem?.state || ""}
                  className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
                />
              </div>
            </div>

            {/* Country Row */}
            <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                required
                defaultValue={selectedItem?.country || ""}
                className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
              />
            </div>

            <div className="flex items-center w-full gap-2 mt-2">
              <input
                type="checkbox"
                name="isPrimary"
                id="isPrimary"
                defaultChecked={selectedItem?.isPrimary || false}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="isPrimary"
                className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
              >
                Make this my primary address
              </label>
            </div>

            <button
              type="submit"
              className="bg-slate-900 hover:bg-blue-600 px-5 py-2 w-fit text-white font-bold text-sm border rounded-xl self-end shadow-sm transition-colors cursor-pointer mt-2"
            >
              {isEdit ? "Save Address" : "Confirm Address"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
