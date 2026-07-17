import {
  MdOutlineMoving,
  MdReport,
  MdVerified,
  MdCheckCircleOutline,
  MdOutlineSaveAlt,
  MdFilterList,
} from "react-icons/md";

import { useMerchant } from "../../context/merchantContext";
import { useReducer, useState, useEffect } from "react";

const initialState = {
  all_items: true,
  pending: false,
  flagged: false,
};

function tabSwitcher(localState, action) {
  switch (action.type) {
    case "ALL_ITEMS":
      return initialState;
    case "PENDING":
      return { ...initialState, all_items: false, pending: true };
    case "FLAGGED":
      return { ...initialState, all_items: false, flagged: true };
    default:
      return initialState;
  }
}

function Inventory() {
  const { state } = useMerchant();
  const [localState, dispatch] = useReducer(tabSwitcher, initialState);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const inventoryOverviewData = {
    card1: {
      id: "inv_card_1",
      title: "TOTAL VALUE",
      value: "$412,890.00",
      subtitle: "+12.4%",
      trend: "up",
    },
    card2: {
      id: "inv_card_2",
      title: "LOW STOCK ALERTS",
      value: "18",
      subtitle: "Immediate restock required",
      trend: "down",
    },
    card3: {
      id: "inv_card_3",
      title: "ACTIVE SKUS",
      value: "2,419",
      subtitle: "98%",
      trend: "neutral",
    },
    card4: {
      id: "inv_card_4",
      title: "MERCHANT LEVEL",
      value: "Elite",
      subtitle: "Nexus Preferred Partner",
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
      id: "sku_4",
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
      id: "sku_5",
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
      id: "sku_6",
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
      id: "sku_7",
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
      id: "sku_8",
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
      id: "sku_9",
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

  const filteredInventoryData = inventoryTableData.filter((item) => {
    if (localState.pending) return item.status === "Pending";
    if (localState.flagged) return item.status === "Flagged";
    return true;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [localState]);

  const totalPages = Math.ceil(filteredInventoryData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredInventoryData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  const StatusColorSwitch = (status) => {
    switch (status) {
      case "Pending":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Approved":
        return "text-green-700 bg-green-50 border-green-200";
      case "Flagged":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  const unitColorSwitch = (status) => {
    switch (status) {
      case "high":
        return "text-green-700";
      case "low":
        return "text-red-700";
      default:
        return "";
    }
  };

  if (!state.inventory) return null;

  return (
    <div className="w-full h-screen bg-slate-50 px-5 py-6 flex flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-8 w-full px-5 py-5 h-full min-h-0">
        <div className="flex items-start w-full font-hanken tracking-tight text-slate-600 shrink-0">
          <p className="text-2xl font-bold text-slate-800 capitalize">
            Inventory Management
          </p>
        </div>
        {/* cards */}
        <div className="grid grid-cols-4 w-full gap-3 shrink-0">
          {/* card no 1 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest ">
                {inventoryOverviewData.card1.title}:
              </p>
            </div>
            <p className="text-2xl self-end tracking-wider font-bold text-slate-800">
              {inventoryOverviewData.card1.value}
            </p>
            <div className="self-end">
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex items-center gap-1 text-green-600 pr-1">
                  <MdOutlineMoving />
                  <span className="text-green-600">
                    {inventoryOverviewData.card1.subtitle}
                  </span>
                  <span>vs last month</span>
                </span>
              </p>
            </div>
          </div>
          {/* card no 2 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {inventoryOverviewData.card2.title}:
              </p>
            </div>
            <p className="text-2xl self-end tracking-wider font-bold text-red-600">
              {inventoryOverviewData.card2.value}
            </p>
            <div className="self-end">
              <p className="text-xs flex tracking-wider text-slate-600">
                <span className="inline-flex items-center gap-1 text-red-800 pr-1">
                  <MdReport />
                  <span className="text-red-600 whitespace-nowrap">
                    {inventoryOverviewData.card2.subtitle}
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* card no 3 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {inventoryOverviewData.card3.title}:
              </p>
            </div>
            <p className="text-2xl self-end tracking-wider font-bold text-slate-800">
              {inventoryOverviewData.card3.value}
            </p>
            <div className="self-end">
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex items-center gap-1 text-black pr-1">
                  <MdCheckCircleOutline />
                  <span className="text-black">
                    {inventoryOverviewData.card3.subtitle}
                  </span>
                  <span>approval rate</span>
                </span>
              </p>
            </div>
          </div>
          {/* card 4 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {inventoryOverviewData.card4.title}:
              </p>
            </div>
            <p className="text-2xl self-end tracking-wider font-bold text-blue-600">
              {inventoryOverviewData.card4.value}
            </p>
            <div className="self-end">
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex items-center text-blue-600 gap-1 ">
                  <MdVerified />
                  <span className="text-blue-600">
                    {inventoryOverviewData.card4.subtitle}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 2nd row (Ledger + Quick Add) */}
        <div className="grid grid-cols-4 w-full flex-1 min-h-0">
          <div className="col-span-4 w-full flex flex-col border rounded-lg border-slate-200 shadow-even h-full min-h-0 overflow-hidden bg-white">
            <div className="flex items-center justify-between w-full px-7 py-1 text-slate-600">
              <div className="flex items-center justify-around gap-3 tracking-wider">
                <span
                  className={`px-4 py-1 my-2 rounded-lg hover:bg-blue-100 cursor-pointer ${localState.all_items ? "bg-blue-100 text-blue-800" : ""}`}
                  onClick={() => dispatch({ type: "ALL_ITEMS" })} // Fixed typo here (ALL_ITEMS)
                >
                  All Items
                </span>
                <span
                  className={`px-4 py-1 my-2 rounded-lg hover:bg-blue-100 cursor-pointer ${localState.pending ? "bg-blue-100 text-blue-800" : ""}`}
                  onClick={() => dispatch({ type: "PENDING" })}
                >
                  Pending
                </span>
                <span
                  className={`px-4 py-1 my-2 rounded-lg hover:bg-blue-100 cursor-pointer ${localState.flagged ? "bg-blue-100 text-blue-800" : ""}`}
                  onClick={() => dispatch({ type: "FLAGGED" })}
                >
                  Flagged
                </span>
              </div>
              <div className="flex items-center justify-around gap-3">
                <span className="p-2 my-2 rounded-md border border-slate-400 hover:bg-slate-100 cursor-pointer">
                  <MdFilterList />
                </span>
                <span className="p-2 my-2 rounded-md border border-slate-400 hover:bg-slate-100 cursor-pointer">
                  <MdOutlineSaveAlt />
                </span>
              </div>
            </div>

            {/* table wrapper */}
            <div className="w-full border-t border-slate-200 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none relative">
              <table className="w-full text-center border-collapse whitespace-nowrap">
                <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200 text-xs tracking-wider text-slate-500 font-semibold shadow-sm">
                  <tr>
                    <th className="px-4 py-4">Image</th>
                    <th className="px-4 py-4">SKU Title and ID</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Stock Level</th>
                    <th className="px-4 py-4">Unit Price</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 even:bg-slate-50/50 last:border-b-0 text-sm tracking-wider text-slate-600 bg-white transition-colors"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={item.imageUrl}
                          alt="img"
                          className="h-10 mx-auto"
                        />
                      </td>
                      <td className="text-left px-4 py-3">
                        <p className="text-slate-800 font-bold">{item.title}</p>
                        <p className="text-xs text-slate-400 tracking-widest">
                          {item.sku}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 font-semibold rounded-full bg-blue-50 text-blue-500 text-xs tracking-widest">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold ${unitColorSwitch(item.stockStatus)}`}
                        >
                          {item.stockLevel}{" "}
                          <span className="font-light text-xs">units</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-800">
                        {item.unitPrice}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${StatusColorSwitch(item.status)}`}
                        >
                          • {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right cursor-pointer hover:text-slate-500 font-bold tracking-widest">
                        ...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- PAGINATION FOOTER --- */}
            <div className="flex items-center justify-between w-full px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-500 font-medium">
              <p>
                Showing
                {filteredInventoryData.length === 0
                  ? 0
                  : indexOfFirstItem + 1}{" "}
                to {Math.min(indexOfLastItem, filteredInventoryData.length)} of{" "}
                {filteredInventoryData.length} entries
              </p>

              <div className="flex items-center border border-slate-200 rounded-md overflow-hidden">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  &lt; Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`px-3 py-1.5 border-l border-slate-200 transition-colors ${
                        currentPage === pageNumber
                          ? "bg-slate-900 text-white"
                          : "hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 border-l border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
