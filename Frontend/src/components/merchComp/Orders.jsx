import {
  MdOutlineMoving,
  MdReport,
  MdCheckCircleOutline,
  MdOutlineSaveAlt,
  MdFilterList,
} from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";

function Orders() {
  const { state } = useMerchant();

  const ordersOverviewCards = {
    card1: {
      title: "TOTAL ORDERS",
      value: "1,284",
      subtitle: "+12.5% vs last month",
      trend: "up",
    },
    card2: {
      title: "PENDING SHIPMENTS",
      value: "42",
      subtitle: "8 Overdue",
      trend: "alert",
    },
    card3: {
      title: "COMPLETED SALES",
      value: "$48,290.00",
      subtitle: "98.2% fulfillment rate",
      trend: "verified",
    },
  };

  const inventoryTableData = [
    {
      id: "sku_1",
      imageUrl: "/images/nexus-keyboard.png",
      title: "Nexus Precision MK-II",
      sku: "NX-8812-BL",
      category: "Computing",
      stockLevel: 1248,
      stockStatus: "high",
      unitPrice: "$249.00",
      status: "Approved",
    },
    {
      id: "sku_2",
      imageUrl: "/images/acoustics-zen.png",
      title: "Acoustics Zen Pro",
      sku: "AZ-900-MP",
      category: "Audio",
      stockLevel: 4,
      stockStatus: "low",
      unitPrice: "$399.50",
      status: "Pending",
    },
    {
      id: "sku_3",
      imageUrl: "/images/chronos-vault.png",
      title: "Chronos Vault X",
      sku: "CH-X01-SS",
      category: "Watches",
      stockLevel: 82,
      stockStatus: "high",
      unitPrice: "$1,850.00",
      status: "Flagged",
    },
    {
      id: "sku_1",
      imageUrl: "/images/nexus-keyboard.png",
      title: "Nexus Precision MK-II",
      sku: "NX-8812-BL",
      category: "Computing",
      stockLevel: 1248,
      stockStatus: "high",
      unitPrice: "$249.00",
      status: "Approved",
    },
    {
      id: "sku_2",
      imageUrl: "/images/acoustics-zen.png",
      title: "Acoustics Zen Pro",
      sku: "AZ-900-MP",
      category: "Audio",
      stockLevel: 4,
      stockStatus: "low",
      unitPrice: "$399.50",
      status: "Pending",
    },
    {
      id: "sku_3",
      imageUrl: "/images/chronos-vault.png",
      title: "Chronos Vault X",
      sku: "CH-X01-SS",
      category: "Watches",
      stockLevel: 82,
      stockStatus: "high",
      unitPrice: "$1,850.00",
      status: "Flagged",
    },
    {
      id: "sku_1",
      imageUrl: "/images/nexus-keyboard.png",
      title: "Nexus Precision MK-II",
      sku: "NX-8812-BL",
      category: "Computing",
      stockLevel: 1248,
      stockStatus: "high",
      unitPrice: "$249.00",
      status: "Approved",
    },
    {
      id: "sku_2",
      imageUrl: "/images/acoustics-zen.png",
      title: "Acoustics Zen Pro",
      sku: "AZ-900-MP",
      category: "Audio",
      stockLevel: 4,
      stockStatus: "low",
      unitPrice: "$399.50",
      status: "Pending",
    },
    {
      id: "sku_3",
      imageUrl: "/images/chronos-vault.png",
      title: "Chronos Vault X",
      sku: "CH-X01-SS",
      category: "Watches",
      stockLevel: 82,
      stockStatus: "high",
      unitPrice: "$1,850.00",
      status: "Flagged",
    },
  ];

  const StatusColorSwitch = (status) => {
    switch (status) {
      case "Pending":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Approved":
        return "text-green-700 bg-green-50 border-green-200";
      case "Flagged":
        return "text-red-700 bg-red-50 border-red-200";
      default:
    }
  };

  const unitColorSwitch = (status) => {
    switch (status) {
      case "high":
        return "text-green-700";
      case "low":
        return "text-red-700";
      default:
    }
  };

  if (!state.orders) return null;

  return (
    <div className="w-full h-screen bg-slate-50 px-5 py-8 flex flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-6 w-full px-5 py-5 h-full min-h-0">
        <div className="flex items-start w-full font-hanken tracking-tight text-slate-600 shrink-0">
          <p className="text-2xl font-bold text-slate-800 capitalize">
            Orders Overview
          </p>
        </div>

        {/* 3 cards */}
        {/* card no 1 */}
        <div className="grid grid-cols-3 w-full gap-3  shrink-0">
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest ">
                {ordersOverviewCards.card1.title}:
              </p>
            </div>
            <p className="text-2xl  tracking-wider font-bold text-slate-800">
              {ordersOverviewCards.card1.value}
            </p>
            <div className="">
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex text-green-600 pr-1">
                  <MdOutlineMoving />
                </span>
                <span className="text-green-600">
                  {ordersOverviewCards.card1.subtitle}
                </span>{" "}
                vs last month
              </p>
            </div>
          </div>
          {/* card no 2 */}
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {ordersOverviewCards.card2.title}:
              </p>
            </div>
            <p className="text-2xl  tracking-wider font-bold text-red-600">
              {ordersOverviewCards.card2.value}
            </p>
            <div className="">
              <p className="text-xs flex tracking-wider text-slate-600">
                <span className="inline-flex text-red-800 pr-1">
                  <MdReport />
                </span>
                <span className="text-red-600 whitespace-nowrap">
                  {ordersOverviewCards.card2.subtitle}
                </span>
              </p>
            </div>
          </div>

          {/* card no 3 */}
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {ordersOverviewCards.card3.title}:
              </p>
            </div>
            <p className="text-2xl  tracking-wider font-bold text-slate-800">
              {ordersOverviewCards.card3.value}
            </p>
            <div className="">
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex text-black pr-1">
                  <MdCheckCircleOutline />
                </span>
                <span className="text-black">
                  {ordersOverviewCards.card3.subtitle}
                </span>
                <span>approval rate</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2nd row (Ledger + Quick Add) */}
        <div className="grid grid-cols-4 w-full flex-1 min-h-0">
          <div className="col-span-4 w-full flex flex-col border rounded-xl border-slate-400 h-full min-h-0 overflow-auto">
            <div className="flex items-center justify-between w-full px-7 text-slate-600">
              <div className="flex items-center justify-around gap-3 tracking-wider">
                <span className="px-4 py-1 my-2 rounded-lg hover:bg-blue-200 cursor-pointer">
                  All Items
                </span>
                <span className="px-4 py-1 my-2 rounded-lg hover:bg-blue-200 cursor-pointer">
                  Pending
                </span>
                <span className="px-4 py-1 my-2 rounded-lg hover:bg-blue-200 cursor-pointer">
                  Flagged
                </span>
              </div>
              <div className="flex items-center justify-around gap-3">
                <span className="p-2 my-2 rounded-md border border-slate-400 hover:bg-blue-200 cursor-pointer">
                  <MdFilterList />
                </span>
                <span className="p-2 my-2 rounded-md border border-slate-400 hover:bg-blue-200 cursor-pointer">
                  <MdOutlineSaveAlt />
                </span>
              </div>
            </div>
            {/* table */}
            <div className="w-full border-t border-slate-400 hover:border-black flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-slate-50 relative shadow-inner">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="sticky top-0 bg-slate-100 z-10 border-b border-slate-400 text-xs tracking-wider text-slate-600 shadow-sm">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">SKU Title and ID</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Stock Level</th>
                    <th className="px-4 py-3">Unit Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryTableData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-300 last:border-b-0 text-sm tracking-wider text-slate-600 bg-white hover:bg-blue-50 transition-colors"
                    >
                      <td>
                        <img src={item.imageUrl} alt="img" />
                      </td>
                      <td>
                        <p className="text-black font-black">{item.title}</p>
                        <p className="text-xs font-thin">{item.sku}</p>
                      </td>
                      <td className="px-4 py-6">
                        <span className="px-3 py-1 font-semibold rounded-full bg-slate-100 text-slate-400">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 font-semibold rounded-full ${unitColorSwitch(item.stockStatus)}`}
                        >
                          {item.stockLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-black text-black ">
                        {item.unitPrice}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 font-semibold rounded-full ${StatusColorSwitch(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right cursor-pointer hover:text-slate-500 font-bold">
                        -
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
