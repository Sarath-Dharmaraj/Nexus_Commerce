/* eslint-disable react-hooks/set-state-in-effect */
import {
  MdOutlineMoving,
  MdReport,
  MdVerified,
  MdCheckCircleOutline,
  MdOutlineSaveAlt,
  MdFilterList,
  MdEdit,
  MdDelete,
  MdOutlineSearch,
} from "react-icons/md";

import { useMerchant } from "../../context/merchantContext";
import { useState, useEffect, useMemo } from "react";
import { Form } from "react-router-dom";
import FilterSort from "./FilterSort";
import api from "../../api/api";

function Inventory() {
  const { state, dispatch, merchantData } = useMerchant();
  const sellerData = merchantData?.sellerProfile || [];
  const inventoryData = useMemo(() => merchantData?.inventory || [], [merchantData?.inventory]);

  const [isSkuId, setSkuId] = useState(false);
  const [tab, setTab] = useState("ALL_ITEM");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const closeMenu = () => setSkuId(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim() === "") {
        setIsSearchActive(false);
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await api.get(
          `/merchant/search/inventory?query=${searchQuery}`,
        );
        if (res.data.success) {
          setSearchResults(res.data.products);
          setIsSearchActive(true);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error("Inventory Search Error:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setIsSearchActive(false);
      setSearchResults([]);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  // Card data calculation
  const inventoryStats = useMemo(() => {
    if (!inventoryData || inventoryData.length === 0) {
      return {
        totalValue: 0,
        lowStockCount: 0,
        activeSkusCount: 0,
        approvedCount: 0,
        approvalRate: 0,
        valueGrowthRate: 0,
      };
    }

    let totalValue = 0;
    let lowStockCount = 0;
    let activeSkusCount = 0;
    let approvedCount = 0;
    const LOW_STOCK_THRESHOLD = 20;

    inventoryData.forEach((item) => {
      const itemPrice = item.price || item.unitPrice || 0;
      totalValue += itemPrice * item.stockLevel;

      if (item.stockLevel > 0 && item.stockLevel <= LOW_STOCK_THRESHOLD)
        lowStockCount++;
      if (item.stockLevel > 0) activeSkusCount++;
      if (item.status === "Approved") approvedCount++;
    });

    const approvalRate = Math.round(
      (approvedCount / inventoryData.length) * 100,
    );

    const lastMonth = sellerData?.lastMonthValue || 0;
    let valueGrowthRate = 0;

    if (lastMonth > 0) {
      valueGrowthRate = ((totalValue - lastMonth) / lastMonth) * 100;
    } else if (totalValue > 0) {
      valueGrowthRate = 100;
    }

    return {
      totalValue,
      lowStockCount,
      activeSkusCount,
      approvedCount,
      approvalRate,
      valueGrowthRate: Math.round(valueGrowthRate),
    };
  }, [inventoryData, sellerData?.lastMonthValue]);

  // cards
  const inventoryOverviewData = {
    card1: {
      id: "inv_card_1",
      title: "TOTAL VALUE",
      value: inventoryStats.totalValue,
      subtitle: inventoryStats.valueGrowthRate,
      trend:
        inventoryStats.valueGrowthRate > 0
          ? "up"
          : inventoryStats.valueGrowthRate < 0
            ? "down"
            : "neutral",
    },
    card2: {
      id: "inv_card_2",
      title: "LOW STOCK ALERTS",
      value: inventoryStats.lowStockCount,
      subtitle:
        inventoryStats.lowStockCount === 0
          ? "Inventory optimally stocked"
          : inventoryStats.lowStockCount / (inventoryData.length || 1) > 0.2
            ? "Critical restock required"
            : "Restock recommended soon",
      trend:
        inventoryStats.lowStockCount === 0
          ? "up"
          : inventoryStats.lowStockCount / (inventoryData.length || 1) > 0.2
            ? "down"
            : "neutral",
    },
    card3: {
      id: "inv_card_3",
      title: "ACTIVE SKUS",
      value: inventoryStats.activeSkusCount,
      subtitle: inventoryStats.approvalRate,
      trend:
        inventoryStats.approvalRate >= 95
          ? "positive"
          : inventoryStats.approvalRate < 80
            ? "negative"
            : "neutral",
    },
    card4: {
      id: "inv_card_4",
      title: "MERCHANT LEVEL",
      value: "Elite",
      subtitle: "Nexus Preferred Partner",
      trend: "verified",
    },
  };

  const filteredInventoryData = inventoryData.filter((item) => {
    if (tab === "PENDING") return item.status === "Pending";
    if (tab === "FLAGGED") return item.status === "Flagged";
    return true;
  });

  const processedData = useMemo(() => {
    let data = [...filteredInventoryData];

    if (state.categoryBy !== "ALL") {
      data = data.filter((item) => item.category === state.categoryBy);
    }

    if (state.sortBy === "PRICE_ASC") data.sort((a, b) => a.price - b.price);
    if (state.sortBy === "PRICE_DESC") data.sort((a, b) => b.price - a.price);
    if (state.sortBy === "STOCK_ASC")
      data.sort((a, b) => a.stockLevel - b.stockLevel);
    if (state.sortBy === "STOCK_DESC")
      data.sort((a, b) => b.stockLevel - a.stockLevel);

    return data;
  }, [filteredInventoryData, state.sortBy, state.categoryBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tab]);

  const activeData = isSearchActive ? searchResults : processedData;
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeData.slice(indexOfFirstItem, indexOfLastItem);

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

  if (!(state.screen === "INVENTORY")) return null;

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
              {inventoryOverviewData.card1.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
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
              <p className="xl:text-xs md:text-[10px] flex tracking-wider text-slate-600">
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
                  className={`px-4 py-1 my-2 rounded-lg hover:bg-blue-100 cursor-pointer ${tab === "ALL_ITEM" && !isSearchActive ? "bg-blue-100 text-blue-800" : ""}`}
                  onClick={() => {
                    setSearchQuery("");
                    setTab("ALL_ITEM");
                    dispatch({ type: "RESET_ALL" });
                  }}
                >
                  All Items
                </span>
                <span
                  className={`px-4 py-1 my-2 rounded-lg hover:bg-blue-100 cursor-pointer ${tab === "PENDING" && !isSearchActive ? "bg-blue-100 text-blue-800" : ""}`}
                  onClick={() => {
                    setSearchQuery("");
                    setTab("PENDING");
                    dispatch({ type: "RESET_ALL" });
                  }}
                >
                  Pending
                </span>
                <span
                  className={`px-4 py-1 my-2 rounded-lg hover:bg-blue-100 cursor-pointer ${tab === "FLAGGED" && !isSearchActive ? "bg-blue-100 text-blue-800" : ""}`}
                  onClick={() => {
                    setSearchQuery("");
                    setTab("FLAGGED");
                    dispatch({ type: "RESET_ALL" });
                  }}
                >
                  Flagged
                </span>
              </div>
              <div className="relative flex items-center justify-around gap-3">
                {/* Search Bar */}
                <div className="relative flex items-center">
                  <MdOutlineSearch className="absolute left-3 text-lg text-slate-400" />
                  <input
                    type="text"
                    placeholder={
                      isSearching ? "Searching..." : "Search SKUs..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    disabled={isSearching}
                    className="w-48 md:w-56 pl-9 pr-3 py-1.5 text-sm font-medium text-slate-800 border border-slate-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none rounded-md transition-all disabled:opacity-50"
                  />
                </div>

                <span
                  id="filter-trigger-btn"
                  className={`p-2 my-2 rounded-md border border-slate-400 transition-colors cursor-pointer ${state.isFilter ? "bg-black text-white" : " hover:bg-slate-100"}`}
                  onClick={() =>
                    dispatch({ type: "SET_FILTER", payload: !state.isFilter })
                  }
                >
                  <MdFilterList />
                </span>
                <FilterSort page={"inventory"} />
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
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-12 text-center text-slate-500"
                      >
                        {isSearchActive
                          ? "No matching SKUs found."
                          : "No products available in this category."}
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item, index) => (
                      <tr
                        key={item._id || index}
                        className="border-b border-slate-100 even:bg-slate-50/50 last:border-b-0 text-sm tracking-wider text-slate-600 bg-white transition-colors"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={item.imageUrl}
                            alt="img"
                            className="h-10 w-12 object-cover rounded-md mx-auto border border-slate-200"
                          />
                        </td>
                        <td className="text-left px-4 py-3">
                          <p
                            className="text-slate-800 font-bold capitalize truncate max-w-50 xl:max-w-75"
                            title={item.skuTitle}
                          >
                            {item.skuTitle}
                          </p>
                          <p className="text-xs text-slate-400 tracking-widest mt-0.5">
                            {item.skuId}
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
                            {item.stockLevel || 0}{" "}
                            <span className="font-light text-xs">units</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800">
                          $
                          {Number(item.price || 0).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full ${StatusColorSwitch(item.status)}`}
                          >
                            • {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right cursor-pointer font-bold tracking-widest">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setSkuId(
                                isSkuId === item.skuId ? null : item.skuId,
                              );
                            }}
                            className={`relative px-2 py-1 border rounded-md ${isSkuId === item.skuId ? "bg-slate-200 border-slate-300 text-slate-800" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                          >
                            ...
                            {isSkuId === item.skuId && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute z-50 right-full top-0 mr-2 w-56 flex flex-col p-2 bg-white border border-slate-200 rounded-xl shadow-lg tracking-normal cursor-default"
                              >
                                <div className="text-[10px] text-slate-500 font-medium px-2 pb-2 border-b border-slate-100 mb-2 text-left">
                                  SKU: {item.skuId} | Category:{" "}
                                  <span className="capitalize">
                                    {item.category}
                                  </span>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                  <button
                                    className="w-full flex items-center gap-3 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                                    onClick={() => {
                                      dispatch({
                                        type: "SET_EDIT",
                                        payload: item,
                                      });
                                    }}
                                  >
                                    <MdEdit size={18} />
                                    <span>Edit SKU</span>
                                  </button>

                                  <Form
                                    method="DELETE"
                                    className="w-full m-0 p-0"
                                  >
                                    <input
                                      type="hidden"
                                      name="intent"
                                      value="delete_product"
                                    />
                                    <input
                                      type="hidden"
                                      name="skuId"
                                      value={item.skuId}
                                    />

                                    <button
                                      type="submit"
                                      className="w-full flex items-center gap-3 px-3 py-2 bg-white hover:bg-red-50 text-red-600 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                                    >
                                      <MdDelete size={18} />
                                      <span>Delete SKU</span>
                                    </button>
                                  </Form>
                                </div>
                              </div>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* --- PAGINATION FOOTER --- */}
            <div className="flex items-center justify-between w-full px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-500 font-medium">
              <p>
                Showing {activeData.length === 0 ? 0 : indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, activeData.length)} of{" "}
                {activeData.length} entries{" "}
                {isSearchActive && "(filtered by search)"}
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
