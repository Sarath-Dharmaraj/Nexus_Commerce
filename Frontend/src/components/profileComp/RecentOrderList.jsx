import { useProfile } from "../../context/profileContext";
import { MdShoppingBag } from "react-icons/md";

function RecentOrderList({ data }) {
  const { dispatch } = useProfile();

  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full px-2 md:px-0 flex items-center justify-around bg-black/30 backdrop-blur-sm transition-opacity">
      {/* parent container */}
      <div className="flex flex-col items-center justify-around text-600 h-120 tracking-tight font-hanken w-150 py-4 bg-slate-50 border rounded-2xl border-slate-200 shadow-2xl overflow-hidden">
        {/* title and close bar */}
        <div className="flex items-center justify-between w-full px-6 pb-4 border-b border-slate-200 ">
          <span className="inline-flex items-center justify-around text-lg font-bold text-slate-800 ">
            <MdShoppingBag className="self-center mr-2 text-slate-500" />
            Order History
          </span>
          <button
            className="text-xl text-slate-500 font-bold hover:text-red-500 hover:bg-red-50 h-8 w-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            onClick={() => {
              dispatch({ type: "CLOSE" });
            }}
          >
            ✕
          </button>
        </div>

        {/* list of cards */}
        <div className="flex flex-col items-start justify-start w-full px-3 py-2 text-slate-600 tracking-tight font-bold overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 flex-1">
          {data.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full text-sm text-slate-400 font-medium">
              No orders found.
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full px-1 md:px-6 py-4 border-b last:border-b-0 border-slate-100 hover:bg-slate-50/50 transition-colors"
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

export default RecentOrderList;
