import { useFetcher } from "react-router-dom";
import {
  MdCheckCircle,
  MdFlag,
  MdInventory,
  MdStorefront,
} from "react-icons/md";

function ProductPanel({ data }) {
  const products = data.pendingProducts || [];
  const fetcher = useFetcher();

  const isUpdating = (productId) => {
    return (
      fetcher.state !== "idle" &&
      fetcher.formData?.get("productId") === productId
    );
  };

  return (
    <div className="w-full min-h-full p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Product Moderation
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Review and approve new merchant SKU submissions before they go live.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden relative">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product Info
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pricing & Stock
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Moderation Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <MdInventory className="text-4xl text-slate-300 mx-auto mb-2" />
                    No pending products require moderation at this time.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const updatingThisRow = isUpdating(product._id);
                  const merchant = product.merchantId || {};

                  return (
                    <tr
                      key={product._id}
                      className={`hover:bg-slate-50 transition-colors ${updatingThisRow ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-md border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                            <img
                              src={product.imageUrl}
                              alt={product.skuTitle}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span
                              className="font-bold text-slate-800 truncate max-w-[200px]"
                              title={product.skuTitle}
                            >
                              {product.skuTitle}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {product.brand}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {product.skuId}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                            <MdStorefront className="text-slate-400" />
                            {merchant.fullName || "Unknown Merchant"}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5 ml-5">
                            {merchant.email || "No email"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800">
                            $
                            {Number(product.price).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 capitalize">
                            {product.category?.replace("_", " ")} •{" "}
                            {product.stockLevel} in stock
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <fetcher.Form
                          method="POST"
                          className="flex items-center justify-end gap-2"
                        >
                          <input
                            type="hidden"
                            name="intent"
                            value="update_product_status"
                          />
                          <input
                            type="hidden"
                            name="productId"
                            value={product._id}
                          />

                          <button
                            type="submit"
                            name="status"
                            value="Flagged"
                            disabled={updatingThisRow}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                          >
                            <MdFlag size={16} />
                            Flag
                          </button>

                          <button
                            type="submit"
                            name="status"
                            value="Approved"
                            disabled={updatingThisRow}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold text-white bg-green-600 border border-transparent hover:bg-green-700 shadow-sm transition-all"
                          >
                            <MdCheckCircle size={16} />
                            Approve
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

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-xs font-semibold text-slate-500">
          Showing {products.length} pending products
        </div>
      </div>
    </div>
  );
}

export default ProductPanel;
