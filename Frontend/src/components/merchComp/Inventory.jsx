import {
  MdOutlineMoving,
  MdReport,
  MdVerified,
  MdCheckCircleOutline,
} from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";

function Inventory() {
  const { state } = useMerchant();

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

  if (!state.inventory) return null;

  return (
    <div className="w-full h-screen bg-slate-50 px-3 py-5 flex flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-3 w-full px-2 py-2 h-full min-h-0">
        <div className="flex items-start w-full font-hanken tracking-tight text-slate-600 shrink-0">
          <p className="text-2xl font-bold text-slate-800 capitalize">
            financial overview
          </p>
        </div>

        {/* 4 cards */}
        {/* card no 1 */}
        <div className="grid grid-cols-4 w-full gap-3 shrink-0">
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
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
                <span className="inline-flex text-green-600 pr-1">
                  <MdOutlineMoving />
                </span>
                <span className="text-green-600">
                  {inventoryOverviewData.card1.subtitle}
                </span>{" "}
                vs last month
              </p>
            </div>
          </div>
          {/* card no 2 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
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
                <span className="inline-flex text-red-800 pr-1">
                  <MdReport />
                </span>
                <span className="text-red-600 whitespace-nowrap">
                  {inventoryOverviewData.card2.subtitle}
                </span>
              </p>
            </div>
          </div>

          {/* card no 3 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
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
                <span className="inline-flex text-black pr-1">
                  <MdCheckCircleOutline />
                </span>
                <span className="text-black">
                  {inventoryOverviewData.card3.subtitle}
                </span>
                <span>approval rate</span>
              </p>
            </div>
          </div>
          {/* card 4 */}
          <div className="flex flex-col items-start justify-around gap-3 px-2 py-2 bg-white border rounded-sm border-slate-400 hover:border-black w-full">
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
                <span className="inline-flex text-blue-600 pr-1">
                  <MdVerified />
                </span>
                <span className="text-blue-600">
                  {inventoryOverviewData.card4.subtitle}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 2nd row (Ledger + Quick Add) */}
        {/* <div className="grid grid-cols-3 w-full gap-8 flex-1 min-h-0">
          <div className="col-span-2 w-full flex flex-col gap-4 h-full min-h-0">
            <div className="w-full flex items-center justify-between capitalize shrink-0">
              <p className="text-xl font-bold">payout ledger</p>
              <p className="text-blue-600 hover:underline cursor-pointer">
                view all
              </p>
            </div>

            <div className="w-full border rounded-md border-slate-400 hover:border-black flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-slate-50 relative shadow-inner">
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
                      className="border-b border-slate-300 last:border-b-0 text-xs tracking-wide text-slate-800 bg-white hover:bg-blue-50 transition-colors"
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

          <div className="col-span-1 flex flex-col items-start justify-start gap-4 w-full shrink-0">
            <p className="text-xl tracking-tight font-bold text-slate-800 capitalize">
              quick add product
            </p>
            <div className="w-full flex flex-col justify-around gap-4 px-6 py-6 text-xs tracking-wider font-semibold capitalize border rounded-sm border-slate-400 hover:border-black bg-white shadow-sm">
              <div className="flex flex-col items-start justify-around gap-1">
                <label htmlFor="sku_title">SKU title</label>
                <input
                  type="text"
                  name="sku_title"
                  className="w-full text-slate-500 px-2 border border-slate-200 py-1.5 focus:outline-none focus:border-slate-400 rounded-sm"
                />
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
                  <label htmlFor="stock">Initial Stock</label>
                  <input
                    type="number"
                    name="stock"
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

              <button className="w-full bg-slate-900 text-white font-bold tracking-widest uppercase py-3 rounded-sm hover:bg-black transition-colors mt-2">
                + Create SKU
              </button>
            </div>
          </div>
        </div>  */}
      </div>
    </div>
  );
}

export default Inventory;
