/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { useSettings } from "../../context/settingsContext";
import {
  MdAccountBalance,
  MdTrendingUp,
  MdCheckCircle,
  MdLockOutline,
  MdInfoOutline,
} from "react-icons/md";

function Merchant() {
  const user = useSettings() || {};
  const seller = user.sellerProfile || {};
  const fetcher = useFetcher();

  const [isEditingBank, setIsEditingBank] = useState(false);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      setIsEditingBank(false);
    }
  }, [fetcher.state, fetcher.data]);

  const bankDetails = seller.bankAccountDetails || {};
  const ledger = seller.payoutLedger || [];

  const maskAccountNumber = (number) => {
    if (!number) return "Not configured";
    const last4 = number.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-slate-800 text-sm";
  const labelClass =
    "block text-[10px] font-bold text-slate-500 tracking-wider mb-1.5 uppercase";

  const isSubmitting = fetcher.state !== "idle";

  // Check if the user is a seller but hasn't been approved by an admin yet
  const isPendingSeller =
    user.systemRoles?.includes("Seller") && !seller.isApproved;

  if (isPendingSeller) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 bg-slate-50">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
          <MdInfoOutline className="text-6xl text-amber-500 mb-4" />
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            Application Under Review
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your merchant application has been received and is currently waiting
            for admin approval. Please check back later to access your Merchant
            Hub.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-start px-8 py-8 relative">
      <div className="mb-6 w-full border-b border-slate-200 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Merchant Hub</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage your store payouts and view financial analytics.
          </p>
        </div>

        {seller.isApproved ? (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <MdCheckCircle /> Approved Seller
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <MdInfoOutline /> Application Pending
          </span>
        )}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-900 text-white p-5 rounded-md shadow-sm flex flex-col justify-between h-32">
          <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">
            Available Wallet Balance
          </span>
          <span className="text-3xl font-black">
            $
            {Number(seller.walletBalance || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-md shadow-sm flex flex-col justify-between h-32">
          <span className="text-xs text-slate-500 font-bold tracking-wider uppercase flex items-center justify-between">
            Pending Payouts
          </span>
          <span className="text-3xl font-black text-slate-800">
            $
            {Number(seller.pendingPayouts || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-md shadow-sm flex flex-col justify-between h-32">
          <span className="text-xs text-slate-500 font-bold tracking-wider uppercase flex items-center gap-1">
            <MdTrendingUp className="text-green-500 text-lg" /> YTD Revenue
          </span>
          <span className="text-3xl font-black text-slate-800">
            $
            {Number(seller.totalRevenueYtd || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-md p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <MdAccountBalance className="text-xl" />
              <h3 className="font-bold text-lg">Payout Account</h3>
            </div>

            {!isEditingBank ? (
              <div className="flex flex-col gap-4">
                <div>
                  <span className={labelClass}>Account Number</span>
                  <p className="font-mono font-bold text-slate-700 tracking-wider">
                    {maskAccountNumber(bankDetails.number)}
                  </p>
                </div>
                <div>
                  <span className={labelClass}>Routing / IFSC Code</span>
                  <p className="font-mono font-bold text-slate-700 tracking-wider">
                    {bankDetails.routingCode || "Not configured"}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditingBank(true)}
                  className="mt-2 w-full py-2 border border-slate-300 rounded-sm text-sm font-bold text-slate-700 hover:bg-white transition-colors"
                >
                  Update Bank Details
                </button>
              </div>
            ) : (
              <fetcher.Form
                method="POST"
                action="/profile"
                className="flex flex-col gap-4"
              >
                <input type="hidden" name="form_type" value="MERCHANT_BANK" />

                <div>
                  <label className={labelClass}>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    defaultValue={bankDetails.number}
                    className={inputClass}
                    placeholder="Enter full account number"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Routing / IFSC Code</label>
                  <input
                    type="text"
                    name="routingCode"
                    defaultValue={bankDetails.routingCode}
                    className={inputClass}
                    placeholder="e.g. BOFAUS3N"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 leading-tight">
                  <MdLockOutline className="text-lg shrink-0" />
                  <p>
                    Your details are encrypted and securely stored. We use this
                    account to deposit your available wallet balance.
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingBank(false)}
                    className="px-4 py-2 rounded-sm font-bold text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-sm text-white font-bold text-sm shadow-sm transition-all ${
                      isSubmitting
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-black hover:bg-slate-800"
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save Account"}
                  </button>
                </div>
              </fetcher.Form>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-800">Recent Payouts</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-white border-b border-slate-200 text-xs tracking-wider text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Transaction ID</th>
                    <th className="px-5 py-3 text-right">Amount</th>
                    <th className="px-5 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-5 py-8 text-center text-sm text-slate-500"
                      >
                        No payout history available yet.
                      </td>
                    </tr>
                  ) : (
                    ledger.map((entry, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-b-0 text-sm hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-5 py-4 text-slate-600">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-500">
                          {entry.transactionId}
                        </td>
                        <td className="px-5 py-4 font-bold text-slate-800 text-right">
                          $
                          {Number(entry.amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                              entry.status === "Cleared"
                                ? "bg-green-100 text-green-700"
                                : entry.status === "Processing"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Merchant;
