import { useProfile } from "../../context/profileContext";
import { MdTrendingFlat, MdShoppingBag } from "react-icons/md";
import RecentOrderList from "./RecentOrderList";

function ProfileRecentOrders() {
  const { state, dispatch, userData } = useProfile();

  // Safely extract and format the orders from backend data
  const rawOrders = userData?.order || [];

  const recentOrders = rawOrders.map((order) => {
    const product = order.items?.productId || {};

    return {
      id: order._id || order.orderId,
      title: product.skuTitle || "Unknown Product",
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: `$${Number(order.totalAmount || 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      status: order.buyerStatus || "IN-PROCESS",
      image: product.imageUrl || "https://via.placeholder.com/150",
    };
  });

  return (
    <div className="col-span-4 row-span-2 w-full h-70 md:h-full border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden">
      {state.isOrdersOpen && <RecentOrderList data={recentOrders} />}

      {/* Header of recent orders */}
      <div className="flex items-center justify-between w-full px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0 text-lg font-bold tracking-tight text-slate-800">
        <span className="inline-flex items-center">
          <MdShoppingBag className="mx-1 text-xl text-slate-500" />
          Recent Orders
        </span>
        <span
          className="inline-flex items-center text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_ORDERS" })}
        >
          View All <MdTrendingFlat className="ml-1 text-lg" />
        </span>
      </div>

      <div className="overflow-y-auto scrollbar-thumb-slate-300 scrollbar-thin flex-1 pr-1 mb-4">
        <div className="pr-3 py-1">
          {recentOrders.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-slate-400 font-medium">
              No recent orders found.
            </div>
          ) : (
            recentOrders.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-3 border-b last:border-b-0 border-slate-100 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt="product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm text-slate-800 tracking-tight line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                  <p className="text-sm font-bold text-slate-900 tracking-tight">
                    {item.price}
                  </p>
                  <p
                    className={`text-[10px] font-bold tracking-wider py-0.5 w-24 md:w-28 text-center rounded-md border
                      ${
                        item.status === "IN-PROCESS"
                          ? "text-blue-700 bg-blue-50 border-blue-200/60"
                          : item.status === "DELIVERED"
                            ? "text-green-700 bg-green-50 border-green-200/60"
                            : item.status === "CANCELLED"
                              ? "text-red-700 bg-red-50 border-red-200/60"
                              : "text-slate-700 bg-slate-50 border-slate-200/60"
                      }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileRecentOrders;
