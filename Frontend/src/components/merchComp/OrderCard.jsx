import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import {
  MdClose,
  MdOutlineLocationOn,
  MdPayment,
  MdShoppingBag,
} from "react-icons/md";

function OrderCard({ order, onClose }) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data?.success &&
      fetcher.data?.intent === "update_order_status"
    ) {
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose]);

  if (!order) return null;

  const isSubmitting = fetcher.state !== "idle";
  const canUpdate = order.merchantStatus === "PENDING";
  const address = order.address || {};

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-hanken p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-800">Order Details</h2>
            <p className="text-sm font-semibold text-blue-600 mt-0.5">
              {order.orderId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Order Info Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Customer & Payment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MdPayment /> Payment Method
              </span>
              <span className="text-sm font-bold text-slate-700 capitalize">
                {order.payment?.method || "Unknown"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Current Status
              </span>
              <span
                className={`text-sm font-black w-max px-2 py-0.5 rounded-sm ${
                  order.merchantStatus === "FULFILLED"
                    ? "bg-green-100 text-green-700"
                    : order.merchantStatus === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.merchantStatus}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-slate-100"></div>

          {/* Shipping Address */}
          <div className="flex flex-col gap-1 text-sm text-slate-700">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <MdOutlineLocationOn /> Shipping Address
            </span>
            <p className="font-semibold">{order.buyerName || "Customer"}</p>
            <p>
              {address.street} {address.suite && `, ${address.suite}`}
            </p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
          </div>

          <div className="h-px w-full bg-slate-100"></div>

          {/* Items & Total */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MdShoppingBag /> Order Summary
            </span>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100">
              <span>
                {order.items?.quantity || 1}x Item(s) @ $
                {order.items?.priceAtPurchase || 0}
              </span>
              <span className="text-lg font-black text-slate-900">
                Total: $
                {Number(order.totalAmount || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          {canUpdate ? (
            <fetcher.Form
              method="POST"
              className="flex items-center gap-3 w-full"
            >
              <input type="hidden" name="intent" value="update_order_status" />
              <input type="hidden" name="orderId" value={order._id} />

              <button
                type="submit"
                name="status"
                value="CANCELLED"
                disabled={isSubmitting}
                className="px-4 py-2 w-full border-2 border-red-200 text-red-600 font-bold rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Cancel Order"}
              </button>

              <button
                type="submit"
                name="status"
                value="FULFILLED"
                disabled={isSubmitting}
                className="px-4 py-2 w-full bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? "Processing..." : "Mark as Fulfilled"}
              </button>
            </fetcher.Form>
          ) : (
            <p className="text-sm font-semibold text-slate-500 w-full text-center">
              This order has been finalized and cannot be modified.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
