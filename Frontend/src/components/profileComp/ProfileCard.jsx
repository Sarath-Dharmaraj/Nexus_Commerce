import { useProfile } from "../../context/profileContext";
import AddCards from "./AddCards";
import { MdCreditCard } from "react-icons/md";

// The main the function
function ProfileCard() {
  const { dispatch, userData } = useProfile();
  const { paymentMethod } = userData;
  return (
    <div className="col-span-2 row-span-2 w-full h-60 md:h-full px-4 py-5 flex flex-col gap-3 bg-white border rounded-2xl border-slate-200 shadow-sm overflow-hidden">
      <AddCards />
      <div className="flex items-center justify-between text-lg font-bold tracking-tight text-slate-800 shrink-0">
        <span className="inline-flex items-center">
          <MdCreditCard className="mx-1 text-xl text-slate-500" />
          Payment Methods
        </span>
        <button
          className="inline-flex items-center justify-center w-7 h-7 text-sm border rounded-md border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_ADD_CARD" })}
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-thumb-slate-300 scrollbar-thin flex-1">
        <div className="pr-2 py-0.5 flex flex-col gap-2">
          {paymentMethod.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center gap-4 px-4 py-2.5 border rounded-xl bg-slate-50/50 border-slate-200 hover:bg-slate-100/50 transition-colors"
            >
              <div className="col-span-1 text-xs uppercase font-bold py-1 text-center bg-slate-200 border rounded-md border-slate-300 text-slate-700 tracking-wider">
                {item.cardType}
              </div>

              <div className="col-span-1 flex flex-col text-start text-slate-600">
                <span className="text-xs font-semibold whitespace-nowrap text-slate-800 tracking-tight">
                  LastDigit: {item.lastFourDigit}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Expire {item.expireDate}
                </span>
              </div>

              <div className="col-span-1 flex justify-end">
                {item.isDefault ? (
                  <div className="text-center text-[11px] font-bold tracking-wide text-blue-700 py-0.5 px-2.5 bg-blue-50 border rounded-md border-blue-200/60">
                    default
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
