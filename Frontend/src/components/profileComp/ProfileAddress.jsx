import { useProfile } from "../../context/profileContext";
import AddAddress from "./AddAddress";
import { MdLocationPin, MdOutlineCreate } from "react-icons/md";

function ProfileAddress() {
  const { dispatch, userData } = useProfile();

  const { address } = userData;

  const primaryAddress = address.find((item) => item.isPrimary === true);

  return (
    <div className="col-span-2 row-span-2 w-full h-60 md:h-full px-4 py-5 flex flex-col gap-3 bg-white border rounded-2xl border-slate-200 shadow-sm overflow-hidden">
      <AddAddress />
      {/* Header Container */}
      <div className="flex items-center justify-between text-lg font-bold tracking-tight text-slate-800 shrink-0">
        <span className="inline-flex items-center">
          <MdLocationPin className="mx-1 text-xl text-slate-500" />
          Primary Location
        </span>
        <button
          className="inline-flex items-center justify-center w-7 h-7 text-sm border rounded-md border-slate-300 hover:bg-slate-50 transition-colors"
          onClick={() => dispatch({ type: "OPEN_ADD_ADDRESS" })}
        >
          <MdOutlineCreate />
        </button>
      </div>

      {primaryAddress ? (
        <div className="flex flex-col justify-center items-start px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-xl text-slate-600 gap-0.5 flex-1 ">
          <span className="font-bold text-slate-800 mb-1">
            {userData.fullName}
          </span>
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
