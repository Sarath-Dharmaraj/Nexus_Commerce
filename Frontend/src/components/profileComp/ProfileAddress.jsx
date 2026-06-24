import { Form } from "react-router-dom";

import { useProfile } from "../../context/profileContext";
import { MdLocationPin, MdOutlineCreate } from "react-icons/md";

// component to add cards here

function AddAddress() {
  const { dispatch } = useProfile();
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
          <Form method="post " className="w-full flex flex-col gap-4">
            <input
              type="text"
              defaultValue={"ADDRESS"}
              hidden
              name="form_type"
              id="form_type"
            />
            <div className="flex flex-col items-start w-full gap-1">
              <label htmlFor="address_street">Street Address</label>
              <input
                type="text"
                name="address_street"
                required
                className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none "
              />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="address_suite">Suite/Apartment</label>
                <input
                  type="text"
                  name="address_suite"
                  placeholder=""
                  required
                  className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-400 placeholder:tracking-tight placeholder:font-normal"
                />
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="address_zipcode">Zipcode</label>
                <input
                  type="text"
                  name="address_zipcode"
                  placeholder=""
                  required
                  className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-400 placeholder:tracking-tight placeholder:font-normal"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="address_city">City</label>
                <input
                  type="text"
                  name="address_city"
                  placeholder=""
                  required
                  className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-400 placeholder:tracking-tight placeholder:font-normal"
                />
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <label htmlFor="address_state">State/Province</label>
                <input
                  type="text"
                  name="address_state"
                  placeholder=""
                  required
                  className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-400 placeholder:tracking-tight placeholder:font-normal"
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <label htmlFor="address_country">Country</label>
              <input
                type="text"
                name="address_country"
                required
                className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none "
              />
            </div>
            <div className="flex items-start w-full gap-1">
              <input
                type="radio"
                name="card_idDafault"
                required
                className="peer appearance-none w-3 h-3 border rounded-full border-gray-400 cursor-pointer checked:bg-blue-500 checked:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 self-center mr-2 "
              />
              <label htmlFor="card_idDafault">
                Make this my primary address
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-900 hover:bg-green-600 px-3 py-2 w-fit text-white border rounded-lg self-end"
            >
              Confirm
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function ProfileAddress() {
  const { state, dispatch } = useProfile();

  const addressList = [
    {
      street: "123 Nexus Boulevard",
      suite: "Suite 400",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
      isPrimary: true,
    },
    {
      street: "456 Market Street",
      suite: "Apt 2B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      country: "United States",
      isPrimary: false,
    },
  ];

  const primaryAddress = addressList.find((item) => item.isPrimary === true);

  return (
    <div className="col-span-2 row-span-2 w-full px-4 py-5 h-52 flex flex-col gap-3 bg-white border rounded-2xl border-slate-200 shadow-sm overflow-hidden">
      {state.isAddressOpen && <AddAddress />}
      {/* Header Container */}
      <div className="flex items-center justify-between text-lg font-bold tracking-tight text-slate-800 shrink-0">
        <span className="inline-flex items-center">
          <MdLocationPin className="mx-1 text-xl text-slate-500" />
          Primary Location
        </span>
        <button
          className="inline-flex items-center justify-center w-7 h-7 text-sm border rounded-md border-slate-300 hover:bg-slate-50 transition-colors"
          onClick={() => dispatch({ type: "OPEN_ADDRESS" })}
        >
          <MdOutlineCreate />
        </button>
      </div>

      {primaryAddress ? (
        <div className="flex flex-col items-start px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm text-slate-600 gap-0.5 flex-1 justify-center">
          <span className="font-bold text-slate-800 mb-1">Eleanor Vance</span>
          <span>
            {primaryAddress.street} {primaryAddress.suite}
          </span>
          <span>
            {primaryAddress.city}, {primaryAddress.state}{" "}
            {primaryAddress.zipCode}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1">
            {primaryAddress.country}
          </span>
        </div>
      ) : (
        <div
          className="flex-1 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex items-center justify-center text-sm font-medium text-blue-600 hover:underline cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_ADDRESS" })}
        >
          + Add Address
        </div>
      )}
    </div>
  );
}

export default ProfileAddress;
