import { useState, useEffect, useRef } from "react";
import { useMerchant } from "../../context/merchantContext";

function FilterSort({ page }) {
  const { state, dispatch } = useMerchant();

  const [payload, setPayload] = useState({
    sortBy: state.sortBy,
    categoryBy: state.categoryBy,
  });

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest("#filter-trigger-btn")) return;
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch({ type: "SET_FILTER", payload: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  if (!state.isFilter) return null;

  const handlePayload = (updateWith) => {
    const isSameValue = payload[updateWith.actionType] === updateWith.value;
    const newValue = isSameValue
      ? updateWith.actionType === "sortBy"
        ? "NONE"
        : "ALL"
      : updateWith.value;

    const newPayload = {
      ...payload,
      [updateWith.actionType]: newValue,
    };

    setPayload(newPayload);

    dispatch({ type: "SET_SORT_FILTER", payload: newPayload });
  };

  const inventorySet = [
    {
      id: "priceSort",
      groupLabel: "Sort by Price",
      actionType: "sortBy",
      options: [
        { label: "Low to High", value: "PRICE_ASC" },
        { label: "High to Low", value: "PRICE_DESC" },
      ],
    },
    {
      id: "stockSort",
      groupLabel: "Sort by Stock",
      actionType: "sortBy",
      options: [
        { label: "Low to High", value: "STOCK_ASC" },
        { label: "High to Low", value: "STOCK_DESC" },
      ],
    },
    {
      id: "category",
      groupLabel: "Filter by Category",
      actionType: "categoryBy",
      options: [
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
      actionType: "sortBy",
      options: [
        { label: "Date: Newest First", value: "DATE_DESC" },
        { label: "Date: Oldest First", value: "DATE_ASC" },
      ],
    },
    {
      id: "priceSort",
      groupLabel: "Sort by Amount",
      actionType: "sortBy",
      options: [
        { label: "Amount: Low to High", value: "PRICE_ASC" },
        { label: "Amount: High to Low", value: "PRICE_DESC" },
      ],
    },
    {
      id: "status",
      groupLabel: "Filter by Status",
      actionType: "categoryBy",
      options: [
        { label: "FULFILLED", value: "FULFILLED" },
        { label: "Pending", value: "PENDING" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },
  ];

  const activeSet = page == "inventory" ? inventorySet : ordersSet;

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 z-50 w-68 bg-white text-slate-600 font-hanken border rounded-md border-slate-400 overflow-hidden"
    >
      <div className="flex flex-col w-full items-start gap-2">
        {activeSet.map((items) => (
          <div key={items.id} className="flex flex-col w-full gap-1.5">
            {/* Filter & sort heading */}
            <span className="relative group bg-slate-200 px-2 text-slate-800 tracking-wider">
              {items.groupLabel}:
            </span>
            {/* filter & sort options */}
            <div className="w-full flex flex-wrap gap-1 px-2">
              {items.options.map((group) => (
                <span
                  key={group.value}
                  onClick={() =>
                    handlePayload({
                      actionType: items.actionType,
                      value: group.value,
                    })
                  }
                  className={`text-sm tracking-tighter px-3 rounded-xl cursor-pointer whitespace-nowrap border ${
                    group.value === payload.sortBy ||
                    group.value === payload.categoryBy
                      ? " border-slate-400 bg-slate-300 text-slatw-800"
                      : "border-slate-200 bg-slate-50 hover:bg-blue-200"
                  }`}
                >
                  {group.label}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="h-px w-full border border-slate-400"></div>
        <div className="flex justify-end w-full px-4 mb-2">
          <button
            onClick={() => {
              dispatch({ type: "RESET_ALL" });
              setPayload({ sortBy: "NONE", categoryBy: "ALL" });
            }}
            className="px-2 py-1 border rounded-md border-slate-800 bg-white hover:bg-black hover:text-white transition-colors capitalize"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSort;
