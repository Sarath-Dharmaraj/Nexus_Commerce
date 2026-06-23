import {
  MdBrightness7,
  MdCreditCard,
  MdFavoriteBorder,
  MdLocationPin,
  MdOutlinePerson,
  MdShoppingBag,
  MdTrendingFlat,
} from "react-icons/md";

function Profile() {
  const userProfileData = {
    recentOrders: [
      {
        id: "ord_01",
        title: 'NexusBook Pro 14"',
        date: "Oct 24, 2024",
        price: "$1,299.00",
        status: "IN-PROCESS",
        image: "laptop.png",
      },
      {
        id: "ord_02",
        title: "Chronos Smartwatch Series 8",
        date: "Oct 12, 2024",
        price: "$399.00",
        status: "DELIVERED",
        image: "watch.png",
      },
      {
        id: "ord_01",
        title: 'NexusBook Pro 14"',
        date: "Oct 24, 2024",
        price: "$1,299.00",
        status: "OUT-FOR-DELIVERY",
        image: "laptop.png",
      },
      {
        id: "ord_02",
        title: "Chronos Smartwatch Series 8",
        date: "Oct 12, 2024",
        price: "$399.00",
        status: "RETURN",
        image: "watch.png",
      },
    ],
    paymentMethod: [
      {
        cardType: "Visa",
        lastFourDigit: 4242,
        expireDate: "12/25",
        isDefault: true,
      },
      {
        cardType: "Mastercard",
        lastFourDigit: 8899,
        expireDate: "08/28",
        isDefault: false,
      },
      {
        cardType: "Amex",
        lastFourDigit: 1002,
        expireDate: "03/27",
        isDefault: false,
      },
    ],

    address: [
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
    ],
  };
  return (
    <div className="w-full h-full flex flex-col px-3 md:px-10 lg:px-22 pt-12 lg:pt-10 bg-slate-50">
      <div className="grid grid-cols-5 grid-rows-5 gap-2 flex-1">
        {/* Profile Preview*/}

        <div className="row-span-4 border flex flex-col items-center gap-3">
          <div className="aspect-square w-52 rounded-2xl bg-white border border-slate-400 flex flex-col items-center justify-around">
            <img
              src="profile.png"
              className="w-38 object-cover rounded-sm"
              alt="Profile"
            />
            <div className="flex flex-col items-center justify-around">
              <p className="text-xl font-semibold capitalize">Eleanor Vance</p>
              <p className="text-xs capitalize">Nexus Prime Member</p>
            </div>
          </div>
          <div className="flex flex-col w-full px-6 text-xs text-slate-600 capitalize flex-1">
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

        {/* Recent orders */}
        <div className="col-span-4 row-span-2 w-full h-52 border border-slate-400 rounded-sm flex flex-col overflow-hidden">
          {/* header of recent orders */}

          <div className="flex items-center justify-between w-full px-7 py-4 border-b border-slate-400 overflow-hidden">
            <p className="text-2xl tracking-tight">Recent Orders</p>
            <span className="inline-flex text-sm text-blue-600 hover:underline cursor-pointer">
              View All <MdTrendingFlat className="self-center ml-1 text-xl" />
            </span>
          </div>

          {/* recent order list */}

          <div className="overflow-y-auto scrollbar-thumb-slate-400 scrollbar-none">
            {userProfileData.recentOrders.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-around px-7 py-2 bg-white border-b border-r border-slate-400 hover:bg-slate-50"
              >
                <img src={item.image} alt="product image" className="w-18" />
                <div className="flex items-center justify-between px-7 flex-1">
                  <div className="flex flex-col justify-around">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-slate-600">{item.date}</p>
                  </div>
                  <div>
                    <div className="flex flex-col items-end justify-around gap-1">
                      <p className="text-sm font-semibold">{item.price}</p>
                      <p
                        className={`text-[10px]  py-1  w-35 text-center
                          ${
                            item.status === "IN-PROCESS"
                              ? "text-blue-800 bg-blue-100"
                              : item.status === "OUT-FOR-DELIVERY"
                                ? "text-yellow-800 bg-yellow-100"
                                : item.status === "DELIVERED"
                                  ? "text-green-800 bg-green-100"
                                  : "text-red-800 bg-red-100"
                          }`}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="col-span-2 row-span-2 w-full px-3 py-6 h-52 flex flex-col gap-2 bg-white border rounded-sm border-slate-400 overflow-hidden">
          <div className="flex items-center justify-between text-2xl tracking-widest shrink-0">
            <span className="inline-flex px-2 tracking-tight">
              <MdCreditCard className="self-center mx-1" />
              Payment Methods
            </span>
            <span className="border rounded-sm border-white hover:border-slate-400 hover:bg-slate-50 px-2 cursor-pointer">
              +
            </span>
          </div>
          <div className="flex flex-col px-4 pt-4 bg-white gap-1 overflow-y-auto scrollbar-none">
            {userProfileData.paymentMethod.map((item) => (
              <div className="grid grid-cols-3 items-center gap-6 px-4 py-3 border rounded-xs bg-slate-50 border-slate-400">
                <div className="col-span-1 text-sm uppercase tracking-tight font-semibold py-1 text-center bg-slate-200 border rounded-xs border-slate-400">
                  {item.cardType}
                </div>
                <div className="col-span-1 flex flex-col text-start tracking-tight">
                  <span className="text-sm font-semibold whitespace-nowrap">
                    LastDigit: {item.lastFourDigit}
                  </span>
                  <span className="text-xs">Expire {item.expireDate}</span>
                </div>

                {item.isDefault ? (
                  <div className="col-span-1 text-center text-sm text-blue-800 tracking-tight py-1 bg-blue-100 border rounded-xs border-slate-400">
                    default
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
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
