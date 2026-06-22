import {
  MdBrightness7,
  MdCreditCard,
  MdFavoriteBorder,
  MdLocationPin,
  MdOutlinePerson,
  MdShoppingBag,
} from "react-icons/md";

function Profile() {
  return (
    <div className="w-full h-full flex flex-col px-3 md:px-10 lg:px-14 pt-8 lg:pt-10 bg-slate-50">
      <div className="grid grid-cols-5 grid-rows-5 gap-2 flex-1">
        <div className="row-span-4 border flex flex-col items-center gap-3">
          <div className="aspect-square w-52 rounded-2xl bg-white border border-slate-300 flex flex-col items-center justify-around">
            <img
              src="profile.png"
              className="w-38 object-cover rounded-lg"
              alt="Profile"
            />
            <div className="flex flex-col items-center justify-around">
              <p className="text-xl font-semibold capitalize">Eleanor Vance</p>
              <p className="text-xs capitalize">Nexus Prime Member</p>
            </div>
          </div>
          <div className="flex flex-col w-full px-6 text-xs text-slate-600 capitalize flex-1">
            <p className="inline-flex px-4 py-2 bg-blue-100 text-black font-semibold rounded-sm">
              <MdOutlinePerson className="self-center mx-1" />
              Profile Overview
            </p>
            <span className="inline-flex px-4 py-2 hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
              <MdShoppingBag className="self-center mx-1" />
              My Orders
            </span>
            <span className="inline-flex px-4 py-2 hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
              <MdFavoriteBorder className="self-center mx-1" />
              saved Items
            </span>
            <span className="inline-flex px-4 py-2 hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
              <MdCreditCard className="self-center mx-1" /> payment methods
            </span>
            <span className="inline-flex px-4 py-2 hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm">
              <MdLocationPin className="self-center mx-1" />
              addresses
            </span>
            <span className="inline-flex px-4 py-2 hover:bg-blue-100 hover:text-black hover:font-semibold rounded-sm mt-2">
              <MdBrightness7 className="self-center mx-1" /> account settings
            </span>
          </div>
        </div>
        <div className="col-span-4 row-span-2 border">recent order</div>
        <div className="col-span-2 row-span-2 border">card</div>
        <div className="col-span-2 row-span-2 border">address</div>
        {/* <div className="col-span-3 row-span-3 flex flex-col">
          <div className="grid grid-row-2 grid-col-2 flex-1">
            <div className="col-span-2">Recent Orders</div>
            <div className="col-span-2 flex items-center justify-around">
              <p className="">cards</p>
              <p className="">address</p>
            </div>
          </div>
        </div> */}
        <div className="col-span-5 border">footer</div>
      </div>
    </div>
  );
}

export default Profile;
