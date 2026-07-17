import {
  MdOutlineMoving,
  MdReport,
  MdCheckCircleOutline,
  MdOutlineSaveAlt,
  MdFilterList,
} from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";
import { useState } from "react";

function Orders() {
  const { state } = useMerchant();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const ordersTableData = [
    {
      orderId: "#NXS-82910",
      date: "Oct 24, 2023",
      customer: { name: "Jane Doe", initials: "JD" },
      total: "$249.00",
      status: "FULFILLED",
    },
    {
      orderId: "#NXS-82911",
      date: "Oct 24, 2023",
      customer: { name: "Marcus Sterling", initials: "MS" },
      total: "$1,120.50",
      status: "PENDING",
    },
    {
      orderId: "#NXS-82912",
      date: "Oct 23, 2023",
      customer: { name: "Aria Laurent", initials: "AL" },
      total: "$89.00",
      status: "CANCELLED",
    },
    {
      orderId: "#NXS-82913",
      date: "Oct 23, 2023",
      customer: { name: "Robert King", initials: "RK" },
      total: "$3,400.00",
      status: "FULFILLED",
    },
  ];

  const StatusColorSwitch = (status) => {
    switch (status) {
      case "PENDING":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "FULFILLED":
        return "text-green-700 bg-green-50 border-green-200";
      case "CANCELLED":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  const totalPages = Math.ceil(ordersTableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = ordersTableData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="grid grid-cols-3 w-full gap-3 shrink-0">
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest ">
                {ordersOverviewCards.card1.title}:
              </p>
            </div>
            <p className="text-2xl tracking-wider font-bold text-slate-800">
              {ordersOverviewCards.card1.value}
            </p>
            <div>
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
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {ordersOverviewCards.card2.title}:
              </p>
            </div>
            <p className="text-2xl tracking-wider font-bold text-red-600">
              {ordersOverviewCards.card2.value}
            </p>
            <div>
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
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-sm border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-start w-full">
              <p className="text-xs font-bold uppercase tracking-widest">
                {ordersOverviewCards.card3.title}:
              </p>
            </div>
            <p className="text-2xl tracking-wider font-bold text-slate-800">
              {ordersOverviewCards.card3.value}
            </p>
            <div>
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex text-black pr-1">
                  <MdCheckCircleOutline />
                </span>
                <span className="text-black">
                  {ordersOverviewCards.card3.subtitle}
                </span>
                <span> approval rate</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2nd row */}
        <div className="grid grid-cols-4 w-full flex-1 min-h-0">
          <div className="col-span-4 w-full flex flex-col h-full min-h-0 gap-4">
            <div className="flex items-center justify-between w-full text-slate-600 shrink-0">
              <div className="flex items-center justify-around gap-8 tracking-wider">
                <span className="py-3 font-black text-black hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700 cursor-pointer">
                  All Orders
                </span>
                <span className="py-3 font-black text-black hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700 cursor-pointer">
                  Payment History
                </span>
              </div>
              <div className="flex items-center justify-around gap-3">
                <span className="inline-flex items-center gap-3 px-3 py-2 tracking-wider text-slate-800 rounded-md border border-slate-400 hover:bg-slate-100 cursor-pointer">
                  <MdFilterList className="text-xl" /> <span>Filter</span>
                </span>
                <span className="inline-flex items-center gap-3 px-3 py-2 tracking-wider text-slate-800 rounded-md border border-slate-400 hover:bg-slate-100 cursor-pointer">
                  <MdOutlineSaveAlt className="text-xl" /> <span>Export</span>
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-slate-400 mb-2 shrink-0"></div>

            <div className="border rounded-md border-slate-300 shadow-even z-10 m-2 flex-1 flex flex-col overflow-hidden bg-white w-full relative">
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-slate-50">
                <table className="w-full text-center border-collapse whitespace-nowrap">
                  <thead className="sticky top-0 bg-slate-100 z-10 border-b border-slate-400 text-xs tracking-wider text-slate-600 shadow-sm">
                    <tr className="text-center">
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Customer Name</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 even:bg-slate-50/50 last:border-b-0 text-center text-sm tracking-wider text-slate-600 bg-white transition-colors"
                      >
                        <td className="text-blue-800 font-black">
                          {item.orderId}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.date}
                        </td>
                        <td className="px-4 py-3 text-slate-800">
                          {item.customer.name}
                        </td>
                        <td className="px-4 py-3 font-black text-black">
                          {item.total}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 font-semibold rounded-full ${StatusColorSwitch(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between w-full px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-500 font-medium shrink-0">
                <p>
                  Showing
                  {ordersTableData.length === 0
                    ? 0
                    : indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, ordersTableData.length)} of{" "}
                  {ordersTableData.length} entries
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
    </div>
  );
}

export default Orders;
