import { useProfile } from "../../context/profileContext";

import {
  MdBrightness7,
  MdCreditCard,
  MdFavoriteBorder,
  MdLocationPin,
  MdOutlinePerson,
  MdShoppingBag,
  MdOutlineCreate,
} from "react-icons/md";

function ProfileOverview() {
  const { dispatch, userData } = useProfile();
  return (
    <div className=" relative row-span-4 md:h-full col-span-1 flex flex-col items-center gap-4">
      <MdOutlineCreate
        className="absolute top-2 right-2 text-slate-400 cursor-pointer hover:text-slate-800"
        onClick={() => dispatch({ type: "OPEN_PROFILE_EDIT" })}
      />
      <div className="aspect-square w-52 md:w-full rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-around overflow-hidden">
        <img
          src={userData?.profileImage || "profile.png"}
          className="w-38 object-cover pt-5"
          alt="Profile"
        />

        <div className="flex flex-col items-center justify-around w-full px-4 mb-4">
          <p
            className="text-xl font-semibold capitalize truncate w-full text-center"
            title={userData.fullName}
          >
            {userData.fullName}
          </p>

          <p className="text-xs capitalize text-slate-500 truncate w-full text-center">
            {userData.membership ? "Nexus Prime Member" : "Nexus Member"}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full h-full px-2 text-xs text-slate-600 tracking-tight capitalize flex-1">
        <p className="inline-flex px-4 py-2 cursor-pointer bg-blue-100 text-black font-semibold rounded-sm">
          <MdOutlinePerson className="self-center mx-1" />
          Profile Overview
        </p>
        <span className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
          <MdShoppingBag className="self-center mx-1" />
          My Orders
        </span>
        <span className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
          <MdFavoriteBorder className="self-center mx-1" />
          saved Items
        </span>
        <span
          className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm"
          onClick={() => dispatch({ type: "OPEN_CARD_LIST" })}
        >
          <MdCreditCard className="self-center mx-1" /> payment methods
        </span>
        <span
          className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm"
          onClick={() => dispatch({ type: "OPEN_ADDRESS_LIST" })}
        >
          <MdLocationPin className="self-center mx-1" />
          addresses
        </span>
        <span className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm mt-2">
          <MdBrightness7 className="self-center mx-1" /> account settings
        </span>
      </div>
    </div>
  );
}

export default ProfileOverview;
