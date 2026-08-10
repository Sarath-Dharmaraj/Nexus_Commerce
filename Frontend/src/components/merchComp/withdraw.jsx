import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useMerchant } from "../../context/merchantContext";

function Withdraw() {
  const { state, dispatch, merchantData } = useMerchant();
  const fetcher = useFetcher();

  const [amount, setAmount] = useState("");

  const activeBalance = merchantData?.sellerProfile?.walletBalance || 0;
  const formattedBalance = `$${activeBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  // Automatically close the modal when the withdrawal request succeeds
  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data?.success &&
      fetcher.data?.intent === "request_withdrawal"
    ) {
      dispatch({ type: "SET_POPUP", payload: "NONE" });
      setAmount(""); // Reset input for next time
    }
  }, [fetcher.state, fetcher.data, dispatch]);

  if (state.popup !== "withdrawn") return null;

  const isSubmitting = fetcher.state !== "idle";
  const isInvalidAmount = Number(amount) <= 0 || Number(amount) > activeBalance;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm font-hanken">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[450px] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Area */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Request Funds Withdrawal
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-1">
            Your Active Balance: {formattedBalance}
          </p>
        </div>

        {/* Form Area */}
        <fetcher.Form method="POST" className="p-6 flex flex-col gap-5">
          <input type="hidden" name="intent" value="request_withdrawal" />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-base font-semibold text-slate-800"
            >
              Enter Withdrawal Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                $
              </span>
              <input
                type="number"
                name="amount"
                id="amount"
                step="0.01"
                min="0.01"
                max={activeBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full pl-7 pr-3 py-2.5 text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-shadow"
              />
            </div>

            <div className="flex items-center justify-between mt-1">
              <p
                className={`text-xs ${Number(amount) > activeBalance ? "text-red-500 font-bold" : "text-slate-500"}`}
              >
                Maximum withdrawal: {formattedBalance}
              </p>
              {/* Show error from backend if validation fails server-side */}
              {fetcher.data && !fetcher.data.success && (
                <p className="text-xs text-red-500 font-bold">
                  {fetcher.data.error || "Request failed"}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isInvalidAmount}
            className={`w-full py-3 rounded-md font-bold text-white transition-colors mt-2 ${
              isSubmitting || isInvalidAmount
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-700 hover:bg-slate-800"
            }`}
          >
            {isSubmitting ? "Processing..." : "Confirm Withdrawal"}
          </button>

          {/* Footer Actions */}
          <div className="flex items-start justify-between mt-2 pt-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_POPUP", payload: "NONE" })}
              className="text-sm font-semibold text-slate-600 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <p className="text-xs text-slate-500 leading-snug w-[60%] text-right">
              Upon submission, a processing entry will be added to your Payout
              Ledger.
            </p>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}

export default Withdraw;
