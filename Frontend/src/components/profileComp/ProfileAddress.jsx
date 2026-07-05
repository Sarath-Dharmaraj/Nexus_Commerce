import { useProfile } from "../../context/profileContext";
import AddAddress from "./AddAddress";
import { MdLocationPin, MdOutlineCreate } from "react-icons/md";

function ProfileAddress() {
  const { dispatch, userData } = useProfile();

  const { address } = userData;
  const primaryAddress = address.find((item) => item.isPrimary === true);

  return (
    <div className="col-span-2 row-span-2 w-full h-60 md:h-full px-5 py-5 flex flex-col gap-4 bg-white border rounded-2xl border-slate-200 shadow-sm overflow-hidden">
      <AddAddress />

      {/* Header Container */}
      <div className="flex items-center justify-between text-lg font-bold tracking-tight text-slate-800 shrink-0">
        <span className="inline-flex items-center">
          <MdLocationPin className="mr-1.5 text-xl text-slate-500" />
          Primary Location
        </span>
        <button
          className="inline-flex items-center justify-center w-7 h-7 text-sm border rounded-md border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_ADD_ADDRESS" })}
        >
          <MdOutlineCreate />
        </button>
      </div>

      {primaryAddress ? (
        <div className="flex flex-col justify-start items-start px-5 py-4 border border-slate-200 rounded-xl bg-slate-50/70 text-sm text-slate-600 gap-1 flex-1 h-full">
          <span className="font-bold text-base text-slate-800 mb-1">
            {userData.fullName}
          </span>
          <span className="font-medium">
            {primaryAddress.street} {primaryAddress.suite}
          </span>
          <span className="font-medium">
            {primaryAddress.city}, {primaryAddress.state}{" "}
            {primaryAddress.zipCode}
          </span>

          <div className="flex items-center justify-between w-full mt-auto pt-4">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {primaryAddress.country}
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase">
              Default
            </span>
          </div>
        </div>
      ) : (
        <div
          className="flex-1 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex items-center justify-center text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_ADD_ADDRESS" })}
        >
          + Add Address
        </div>
      )}
    </div>
  );
}

export default ProfileAddress;
