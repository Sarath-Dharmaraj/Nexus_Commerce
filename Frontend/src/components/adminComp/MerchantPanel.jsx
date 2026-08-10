import { useFetcher } from "react-router-dom";
import {
  MdCheckCircle,
  MdCancel,
  MdAccountBalance,
  MdStorefront,
  MdPayments,
} from "react-icons/md";

function MerchantPanel({ data }) {
  const sellers = data.pendingSellers || [];
  const payouts = data.pendingPayouts || [];
  const fetcher = useFetcher();

  const isUpdatingSeller = (userId) => {
    return (
      fetcher.state !== "idle" &&
      fetcher.formData?.get("userId") === userId &&
      fetcher.formData?.get("intent") === "update_seller_approval"
    );
  };

  const isUpdatingPayout = (transactionId) => {
    return (
      fetcher.state !== "idle" &&
      fetcher.formData?.get("transactionId") === transactionId &&
      fetcher.formData?.get("intent") === "update_payout_status"
    );
  };

  return (
    <div className="w-full min-h-full p-8 flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Merchant & Payouts
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Review new seller applications and process pending financial
          withdrawals.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden relative">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <MdStorefront className="text-xl text-blue-600" />
          <h3 className="font-bold text-slate-800">
            Pending Seller Applications ({sellers.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Applicant Info
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Application Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sellers.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No pending seller applications at this time.
                  </td>
                </tr>
              ) : (
                sellers.map((seller) => {
                  const updating = isUpdatingSeller(seller._id);
                  return (
                    <tr
                      key={seller._id}
                      className={`hover:bg-slate-50 transition-colors ${updating ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">
                            {seller.fullName}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            {seller.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(seller.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <fetcher.Form
                          method="POST"
                          className="flex items-center justify-end gap-2"
                        >
                          <input
                            type="hidden"
                            name="intent"
                            value="update_seller_approval"
                          />
                          <input
                            type="hidden"
                            name="userId"
                            value={seller._id}
                          />

                          <button
                            type="submit"
                            name="isApproved"
                            value="false"
                            disabled={updating}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                          >
                            <MdCancel size={16} /> Reject
                          </button>

                          <button
                            type="submit"
                            name="isApproved"
                            value="true"
                            disabled={updating}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                          >
                            <MdCheckCircle size={16} /> Approve
                          </button>
                        </fetcher.Form>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden relative">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <MdPayments className="text-xl text-green-600" />
          <h3 className="font-bold text-slate-800">
            Pending Payout Ledger ({payouts.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Transaction Info
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Bank Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payouts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No pending payouts require clearance.
                  </td>
                </tr>
              ) : (
                payouts.map((payout) => {
                  const updating = isUpdatingPayout(payout.transactionId);
                  const bank = payout.bankDetails || {};

                  return (
                    <tr
                      key={payout.transactionId}
                      className={`hover:bg-slate-50 transition-colors ${updating ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {payout.merchantName}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-mono text-slate-700">
                            {payout.transactionId}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            {new Date(payout.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col text-sm">
                          <span className="flex items-center gap-1 text-slate-700 font-semibold">
                            <MdAccountBalance className="text-slate-400" />{" "}
                            {bank.number || "Missing"}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5 pl-5">
                            Routing: {bank.routingCode || "Missing"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="font-black text-slate-800">
                          $
                          {Number(payout.amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <fetcher.Form
                          method="POST"
                          className="flex items-center justify-end gap-2"
                        >
                          <input
                            type="hidden"
                            name="intent"
                            value="update_payout_status"
                          />
                          <input
                            type="hidden"
                            name="userId"
                            value={payout.userId}
                          />
                          <input
                            type="hidden"
                            name="transactionId"
                            value={payout.transactionId}
                          />

                          <button
                            type="submit"
                            name="status"
                            value="Failed"
                            disabled={updating || !bank.number}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors disabled:opacity-50"
                            title="Fails the transfer and returns funds to merchant wallet"
                          >
                            <MdCancel size={16} /> Fail
                          </button>

                          <button
                            type="submit"
                            name="status"
                            value="Cleared"
                            disabled={updating || !bank.number}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50"
                            title="Confirms the money was wired successfully"
                          >
                            <MdCheckCircle size={16} /> Clear Funds
                          </button>
                        </fetcher.Form>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MerchantPanel;
