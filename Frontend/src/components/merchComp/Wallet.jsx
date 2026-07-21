import { Form } from "react-router-dom";

import {
  MdAccountBalance,
  MdOutlineMoving,
  MdAccessTime,
  MdTimeline,
} from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";
function Wallet() {
  const { state } = useMerchant();

  const financialOverviewData = {
    card1: {
      id: "card_1",
      title: "ACTIVE BALANCE",
      value: "$42,850.00",
      subtitle: "+12.4%",
      trend: "up",
    },
    card2: {
      id: "card_2",
      title: "PENDING PAYOUTS",
      value: "$8,420.50",
      subtitle: "2 Days",
      trend: "neutral",
    },
    card3: {
      id: "card_3",
      title: "TOTAL REVENUE (Yth)",
      value: "$1.2M",
      progressValue: 80,
    },
  };

  const payoutLedgerData = [
    {
      transactionId: "TXN-89241",
      date: "Oct 24, 2023",
      amount: "$4,250.00",
      status: "Processing",
    },
    {
      transactionId: "TXN-89232",
      date: "Oct 20, 2023",
      amount: "$12,100.50",
      status: "Cleared",
    },
    {
      transactionId: "TXN-89223",
      date: "Oct 15, 2023",
      amount: "$850.00",
      status: "Cleared",
    },
    {
      transactionId: "TXN-89214",
      date: "Oct 10, 2023",
      amount: "$3,400.00",
      status: "Failed",
    },
    {
      transactionId: "TXN-89241",
      date: "Oct 24, 2023",
      amount: "$4,250.00",
      status: "Processing",
    },
    {
      transactionId: "TXN-89232",
      date: "Oct 20, 2023",
      amount: "$12,100.50",
      status: "Cleared",
    },
    {
      transactionId: "TXN-89223",
      date: "Oct 15, 2023",
      amount: "$850.00",
      status: "Cleared",
    },
    {
      transactionId: "TXN-89214",
      date: "Oct 10, 2023",
      amount: "$3,400.00",
      status: "Failed",
    },
    {
      transactionId: "TXN-89241",
      date: "Oct 24, 2023",
      amount: "$4,250.00",
      status: "Processing",
    },
    {
      transactionId: "TXN-89232",
      date: "Oct 20, 2023",
      amount: "$12,100.50",
      status: "Cleared",
    },
    {
      transactionId: "TXN-89223",
      date: "Oct 15, 2023",
      amount: "$850.00",
      status: "Cleared",
    },
    {
      transactionId: "TXN-89214",
      date: "Oct 10, 2023",
      amount: "$3,400.00",
      status: "Failed",
    },
  ];

  const ledgerColorSwitcher = (status) => {
    switch (status) {
      case "Processing":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Cleared":
        return "text-green-700 bg-green-50 border-green-200";
      case "Failed":
        return "text-red-700 bg-red-50 border-red-200";
      default:
    }
  };

  if (!state.wallet) return null;

  return (
    <div className="w-full h-screen bg-slate-50 px-5 py-8 flex flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-6 w-full px-5 py-5 h-full min-h-0">
        <div className="flex items-center justify-between w-full font-hanken tracking-tight text-slate-600 shrink-0">
          <p className="text-2xl font-bold text-slate-800 capitalize">
            financial overview
          </p>
          <p>last updated</p>
        </div>

        {/* 3 cards */}
        {/* card no 1 */}
        <div className="grid grid-cols-3 w-full gap-8 shrink-0">
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-md border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-bold uppercase">
                {financialOverviewData.card1.title}
              </p>
              <span className="text-blue-800 text-xl ">
                <MdAccountBalance />
              </span>
            </div>
            <p className="text-3xl tracking-wider font-bold text-slate-800">
              {financialOverviewData.card1.value}
            </p>
            <div>
              <p className="text-xs tracking-wider text-slate-600">
                <span className="inline-flex text-green-600 pr-1">
                  <MdOutlineMoving />
                </span>
                <span className="text-green-600">
                  {financialOverviewData.card1.subtitle}
                </span>{" "}
                vs last month
              </p>
            </div>
          </div>
          {/* card no 2 */}
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-md border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-bold uppercase">
                {financialOverviewData.card2.title}
              </p>
              <span className="text-black text-xl ">
                <MdAccessTime />
              </span>
            </div>
            <p className="text-3xl tracking-wider font-bold text-slate-800">
              {financialOverviewData.card2.value}
            </p>
            <div>
              <p className="text-xs tracking-wider text-slate-600">
                Expected clearance:{" "}
                <span className="font-bold text-black">
                  {financialOverviewData.card2.subtitle}
                </span>
              </p>
            </div>
          </div>

          {/* card no 3 */}
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border rounded-md border-slate-200 hover:border-slate-300 shadow-xl w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-bold uppercase">
                {financialOverviewData.card3.title}
              </p>
              <span className="text-black text-xl ">
                <MdTimeline />
              </span>
            </div>
            <p className="text-3xl tracking-wider font-bold text-slate-800">
              {financialOverviewData.card3.value}
            </p>
            <div className="relative w-full h-px border-2 rounded-2xl border-blue-200">
              <div
                style={{
                  width: `${financialOverviewData.card3.progressValue}%`,
                }}
                className={`absolute z-50 self-center h-px border-4 rounded-2xl border-blue-600`}
              ></div>
            </div>

            <div className="text-xs tracking-wider text-slate-600 flex justify-between w-full">
              <span>Progress to goal:</span>
              <span className="font-extrabold text-black">
                {financialOverviewData.card3.progressValue}
              </span>
            </div>
          </div>
        </div>

        {/* 2nd row (Ledger + Quick Add) */}
        <div className="grid grid-cols-3 w-full gap-8 flex-1 min-h-0">
          <div className="col-span-2 w-full flex flex-col gap-4 h-full min-h-0">
            <div className="w-full flex items-center justify-between capitalize shrink-0">
              <p className="text-xl font-bold">payout ledger</p>
              <p className="text-blue-600 hover:underline cursor-pointer">
                view all
              </p>
            </div>

            <div className="w-full border rounded-md border-slate-200 hover:border-slate-300 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-slate-50 relative">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="sticky top-0 bg-slate-100 z-10 border-b border-slate-400 text-xs tracking-wider text-slate-600 shadow-sm">
                  <tr>
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutLedgerData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-300 even:bg-slate-100 last:border-b-0 text-xs tracking-wide text-slate-800 bg-white hover:bg-slate-200 transition-colors"
                    >
                      <td className="px-4 py-3 font-bold">
                        {item.transactionId}
                      </td>
                      <td className="px-4 py-3 font-extralight">{item.date}</td>
                      <td className="px-4 py-3 font-extrabold">
                        {item.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 font-semibold rounded-full ${ledgerColorSwitcher(item.status)}`}
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

          {/* quick add product */}
          <div className="col-span-1 flex flex-col items-start justify-start gap-4 w-full shrink-0">
            <p className="text-xl tracking-tight font-bold text-slate-800 capitalize">
              quick add product
            </p>
            <Form
              method="post"
              encType="multipart/form-data"
              className="w-full flex flex-col justify-around gap-4 px-6 py-6 text-xs tracking-wider font-semibold capitalize border rounded-sm border-slate-200 hover:border-slate-300 shadow-2xl bg-white"
            >
              <input type="hidden" name="intent" value="quick_add_product" />
              <div className="w-full flex justify-between gap-4">
                <div className="flex flex-col items-start justify-start gap-1 flex-1">
                  <label htmlFor="skuTitle">SKU title</label>
                  <input
                    type="text"
                    name="skuTitle"
                    id="skuTitle"
                    className="w-full text-slate-500 px-2 border border-slate-200 py-1.5 focus:outline-none focus:border-slate-400 rounded-sm"
                  />
                </div>

                <div className="flex flex-col items-start justify-start gap-1 w-20 shrink-0">
                  <label htmlFor="mainImage">Image</label>
                  <label
                    htmlFor="mainImage"
                    className="w-full h-8.5 flex items-center justify-center border border-slate-200 border-dashed rounded-sm cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors overflow-hidden"
                  >
                    <span className="text-slate-400 text-lg font-light leading-none -mt-0.5">
                      +
                    </span>
                  </label>
                  <input
                    type="file"
                    name="mainImage"
                    id="mainImage"
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="w-full flex justify-between gap-4">
                <div className="flex flex-col items-start justify-start gap-1 w-full relative">
                  <label htmlFor="price">Price (USD)</label>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="w-full pl-7 pr-2 py-1.5 text-slate-700 border rounded-sm border-slate-200 focus:outline-none focus:border-slate-400"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start gap-1 w-full">
                  <label htmlFor="stockLevel">Initial Stock</label>
                  <input
                    type="number"
                    name="stockLevel"
                    className="w-full pl-2 py-1.5 text-slate-700 border rounded-sm border-slate-200 focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start justify-around gap-1 w-full">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  className="w-full text-slate-600 tracking-wider py-1.5 border rounded-sm border-slate-200 focus:outline-none focus:border-slate-400 bg-white"
                >
                  <option value="default" className="text-slate-400">
                    Select Category...
                  </option>
                  <option value="electronic">Electronic</option>
                  <option value="apparel">Apparel</option>
                  <option value="home_goods">Home Goods</option>
                  <option value="sports_outdoors">Sports & Outdoors</option>
                  <option value="health_beauty">Health & Beauty</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-500 text-white font-bold tracking-widest uppercase py-3 rounded-sm hover:bg-black transition-colors mt-2"
              >
                + Create SKU
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
