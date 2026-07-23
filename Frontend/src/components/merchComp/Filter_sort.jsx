import { useState } from "react";
import { useMerchant } from "../../context/merchantContext";

function Filter_sort({ page }) {
  const { state, dispatch } = useMerchant();

  const [payload, setPayload] = useState({
    sortBy: state.sortBy,
    categoryBy: state.categoryBy,
  });

  const inventorySet = [
    {
      id: "priceSort",
      groupLabel: "Sort by Price",
      actionType: "SET_SORT",
      options: [
        { label: "Low to High", value: "PRICE_ASC" },
        { label: "High to Low", value: "PRICE_DESC" },
      ],
    },
    {
      id: "stockSort",
      groupLabel: "Sort by Stock",
      actionType: "SET_SORT",
      options: [
        { label: "Low to High", value: "STOCK_ASC" },
        { label: "High to Low", value: "STOCK_DESC" },
      ],
    },
    {
      id: "category",
      groupLabel: "Filter by Category",
      actionType: "SET_CATEGORY",
      options: [
        { label: "All Categories", value: "ALL" },
        { label: "Electronics", value: "electronic" },
        { label: "Apparel", value: "apparel" },
        { label: "Home Goods", value: "home_goods" },
        { label: "Sports & Outdoors", value: "sports_outdoors" },
        { label: "Health & Beauty", value: "health_beauty" },
      ],
    },
  ];

  const ordersSet = [
    {
      id: "dateSort",
      groupLabel: "Sort by Date",
      actionType: "SET_SORT",
      options: [
        { label: "Date: Newest First", value: "DATE_DESC" },
        { label: "Date: Oldest First", value: "DATE_ASC" },
      ],
    },
    {
      id: "priceSort",
      groupLabel: "Sort by Amount",
      actionType: "SET_SORT",
      options: [
        { label: "Amount: Low to High", value: "PRICE_ASC" },
        { label: "Amount: High to Low", value: "PRICE_DESC" },
      ],
    },
    {
      id: "status",
      groupLabel: "Filter by Status",
      actionType: "SET_CATEGORY",
      options: [
        { label: "FULFILLED", value: "FULFILLED" },
        { label: "Pending", value: "PENDING" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },
  ];

  const activeSet = page == "inventory" ? inventorySet : ordersSet;
  console.log(activeSet);
  return (
    <div className="absolute top-full right-0 z-50 w-68 bg-white text-slate-600 font-hanken border rounded-md border-slate-400 overflow-hidden">
      <div className="flex flex-col w-full items-start gap-1">
        {activeSet.map((items) => (
          <div key={items.id} className="flex flex-col w-full gap-1">
            <span className="relative group bg-slate-200 px-2 text-slate-800 tracking-wider">
              {items.groupLabel}:
            </span>
            <div className="w-full flex flex-wrap gap-1 px-2">
              {items.options.map((group) => (
                <span
                  key={group.value}
                  className={`text-sm tracking-tighter px-3 rounded-xl cursor-pointer whitespace-nowrap ${
                    group.value === payload.sortBy ||
                    group.value === payload.categoryBy
                      ? "border border-slate-400 bg-slate-300 text-slatw-800"
                      : "hover:bg-slate-200"
                  }`}
                >
                  {group.label}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="h-px w-full border border-slate-400"></div>
        <div className="flex justify-around w-full py-1">
          <botton className="px-2 py-1 border rounded-md border-slate-800 bg-white hover:bg-slate-50">
            Clear All
          </botton>
          <botton className="px-2 py-1 border rounded-md border-slate-800 bg-black text-white">
            Confirm
          </botton>
        </div>
      </div>
    </div>
  );
}

export default Filter_sort;
