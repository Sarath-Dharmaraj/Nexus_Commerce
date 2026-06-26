import { useProfile } from "../../context/profileContext";

import {
  MdBrightness7,
  MdCreditCard,
  MdFavoriteBorder,
  MdLocationPin,
  MdOutlinePerson,
  MdShoppingBag,
} from "react-icons/md";

function ProfileOverview() {
  const { userData } = useProfile();
  return (
    <div className="row-span-4 md:h-full col-span-1 flex flex-col items-center gap-4">
      <div className="aspect-square w-52 md:w-full rounded-2xl bg-white border border-slate-200  shadow-sm flex flex-col items-center justify-around">
        <img
          src="profile.png"
          className="w-38 object-cover rounded-md "
          alt="Profile"
        />
        <div className="flex flex-col items-center justify-around">
          <p className="text-xl font-semibold capitalize">
            {userData.fullName}
          </p>
          <p className="text-xs capitalize">
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
        <span className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
          <MdCreditCard className="self-center mx-1" /> payment methods
        </span>
        <span className="inline-flex px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
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
