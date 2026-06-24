import { Form } from "react-router-dom";

import { useProfile } from "../../context/profileContext";
import { MdCreditCard } from "react-icons/md";

// component to add cards here

function AddCards() {
  const { dispatch } = useProfile();
  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-around bg-black/30">
      {/* parent container */}
      <div className="flex flex-col items-center justify-around text-600 tracking-tight font-hanken w-150 py-4 bg-slate-50 border rounded-2xl border-slate-200 shadow-2xl">
        {/* title and close bar */}
        <div className="flex items-center justify-between w-full px-4 border-b border-slate-200">
          <span className="inline-flex items-center justify-around text-lg font-bold text-slate-800 ">
            <MdCreditCard className="self-center mx-2 text-slate-500" />
            Add a New Payment Method
          </span>
          <span
            className="text-2xl text-slate-800 font-bold hover:text-black border border-slate-50 hover:border-slate-200 rounded-lg hover:bg-slate-100 px-2"
            onClick={() => {
              dispatch({ type: "CLOSE" });
            }}
          >
            x
          </span>
        </div>
        {/* list of cards */}
        <div className="flex flex-col items-start justify-around w-full px-14 py-8 text-slate-600 tracking-tight font-bold">
          <Form method="post " className="w-full flex flex-col gap-4">
            <input
              type="text"
              defaultValue={"CARDS"}
              hidden
              name="form_type"
              id="form_type"
            />
            <div className="flex flex-col items-start w-full gap-1">
              <label htmlFor="card_type">Card Type</label>
              <select
                name="card_type"
                required
                className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none "
              >
                <option value="" hidden>
                  Select the Card
                </option>
                <option value="visa">Visa</option>
                <option value="rupay">RuPay</option>
                <option value="mastercard">MasterCard</option>
                <option value="unionpay">UnionPay</option>
              </select>
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <label htmlFor="card_digit">Last Four Digit</label>
              <input
                type="text"
                name="card_digit"
                placeholder="eg: 4242"
                required
                className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-400 placeholder:tracking-tight placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <label htmlFor="card_ExpireOn">Expire On</label>
              <input
                type="text"
                name="card_ExpireOn"
                placeholder="MM/YY"
                required
                className="w-full px-2 py-1 border rounded-sm border-slate-200 hover:border-slate-600 focus:border-slate-400 focus:outline-none placeholder:text-slate-400 placeholder:tracking-tight placeholder:font-normal"
              />
            </div>

            <div className="flex items-start w-full gap-1">
              <input
                type="radio"
                name="card_idDafault"
                required
                className="peer appearance-none w-3 h-3 border rounded-full border-gray-400 cursor-pointer checked:bg-blue-500 checked:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 self-center mr-2 "
              />
              <label htmlFor="card_idDafault">
                Make this my default payment method{" "}
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-900 hover:bg-green-600 px-3 py-2 w-fit text-white border rounded-lg self-end"
            >
              + Add Card
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// The main the function
function ProfileCard() {
  const { state, dispatch } = useProfile();
  const paymentMethod = [
    {
      cardType: "Visa",
      lastFourDigit: 4242,
      expireDate: "12/25",
      isDefault: true,
    },
    {
      cardType: "Mastercard",
      lastFourDigit: 8899,
      expireDate: "08/28",
      isDefault: false,
    },
    {
      cardType: "Amex",
      lastFourDigit: 1002,
      expireDate: "03/27",
      isDefault: false,
    },
  ];
  return (
    <div className="col-span-2 row-span-2 w-full px-4 py-5 h-52 flex flex-col gap-3 bg-white border rounded-2xl border-slate-200 shadow-sm overflow-hidden">
      {state.isCardsOpen && <AddCards />}
      <div className="flex items-center justify-between text-lg font-bold tracking-tight text-slate-800 shrink-0">
        <span className="inline-flex items-center">
          <MdCreditCard className="mx-1 text-xl text-slate-500" />
          Payment Methods
        </span>
        <button
          className="inline-flex items-center justify-center w-7 h-7 text-sm border rounded-md border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => dispatch({ type: "OPEN_CARDS" })}
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
