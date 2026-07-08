import { MdAccountBalance } from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";

function Wallet() {
  const { state } = useMerchant();

  const financialOverviewData = [
    {
      id: "card_1",
      title: "ACTIVE BALANCE",
      value: "$42,850.00",
      subtitle: "+12.4%",
      trend: "up",
      iconType: "bank",
    },
    {
      id: "card_2",
      title: "PENDING PAYOUTS",
      value: "$8,420.50",
      subtitle: "Expected clearance: 2 Days",
      trend: "neutral",
      iconType: "clock",
    },
    {
      id: "card_3",
      title: "TOTAL REVENUE (YTD)",
      value: "$1.2M",
      subtitle: "Progress to goal",
      progressValue: 75,
      iconType: "chart",
    },
  ];

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
  ];

  if (!state.wallet) return null;

  return (
    <div className="w-full h-screen bg-slate-50 px-5 py-8">
      <div className="flex flex-col items-center justify-around gap-6 w-full px-5 py-5 ">
        <div className="flex items-center justify-between px-2 w-full font-hanken tracking-tight text-slate-600 ">
          <p className="text-2xl font-bold text-slate-800 capitalize">
            financial overview
          </p>
          <p>last updated</p>
        </div>
        <div className="flex items-center justify-between w-full gap-8">
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border border-slate-400 hover:border-black  w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-bold uppercase">Active Balance</p>
              <span className="text-blue-800 text-xl ">
                <MdAccountBalance />
              </span>
            </div>
            <p className="text-3xl tracking-wider font-bold text-slate-800">
              $24.000.000
            </p>
            <div>
              <p className="text-xs tracking-wider text-slate-600">
                <span className="text-green-600">+12.5%</span> vs last
                month{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border border-slate-400 hover:border-black  w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-bold uppercase">Active Balance</p>
              <span className="text-blue-800 text-xl ">
                <MdAccountBalance />
              </span>
            </div>
            <p className="text-3xl tracking-wider font-bold text-slate-800">
              $24.000.000
            </p>
            <div>
              <p className="text-xs tracking-wider text-slate-600">
                <span className="text-green-600">+12.5%</span> vs last
                month{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-around gap-4 px-4 py-4 bg-white border border-slate-400 hover:border-black  w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-bold uppercase">Active Balance</p>
              <span className="text-blue-800 text-xl ">
                <MdAccountBalance />
              </span>
            </div>
            <p className="text-3xl tracking-wider font-bold text-slate-800">
              $24.000.000
            </p>
            <div>
              <p className="text-xs tracking-wider text-slate-600">
                <span className="text-green-600">+12.5%</span> vs last
                month{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
