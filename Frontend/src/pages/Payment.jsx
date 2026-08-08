/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { MdMoreVert } from "react-icons/md";
import useCheckout from "../context/checkoutContext";
import CardList from "../components/profileComp/CardList";

function Payment() {
  const { dispatch } = useCheckout() || {};
  const { card } = useLoaderData() || {};

  const [isListOpen, setIsListOpen] = useState(false);

  const primaryCard = useMemo(
    () => card?.find((item) => item.isDefault) || card?.[0] || {},
    [card],
  );

  const [defaultCard, setDefaultCard] = useState(primaryCard);

  useEffect(() => {
    if (primaryCard._id && !defaultCard._id) {
      setDefaultCard(primaryCard);
    }
  }, [primaryCard, defaultCard._id]);

  useEffect(() => {
    if (defaultCard?._id) {
      dispatch?.({ type: "SET_PAYMENT", payload: defaultCard });
    }
  }, [defaultCard, dispatch]);

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-slate-800 text-sm";
  const labelClass =
    "block text-xs font-semibold text-slate-600 tracking-wider mb-1";

  return (
    <div className="w-full text-slate-600 font-hanken tracking-tight">
      {isListOpen && (
        <CardList
          cards={card}
          setDefaultCard={setDefaultCard}
          isOpen={isListOpen}
          onClose={() => setIsListOpen(false)}
        />
      )}

      <div className="bg-white border border-slate-200 rounded-lg p-6 w-full shadow-sm">
        <div className="w-full flex items-center justify-between">
          <div className="mb-4">
            <h2 className="text-3xl font-black text-slate-800 mb-2">
              Payment Information
            </h2>
            <p className="text-slate-500 text-sm tracking-wide">
              Review your payment details below.
            </p>
          </div>
          <div
            className="p-2 text-2xl border rounded-md border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setIsListOpen(true)}
          >
            <MdMoreVert />
          </div>
        </div>

        <div
          key={defaultCard._id || "empty-card"}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Card Number (Last 4 Digits)</label>
              <input
                type="text"
                name="lastFourDigit"
                defaultValue={defaultCard.lastFourDigit}
                placeholder="**** **** **** 1234"
                className={inputClass}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelClass}>Expiry Date</label>
                <input
                  type="text"
                  name="expireDate"
                  defaultValue={defaultCard.expireDate}
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Card Type</label>
                <input
                  type="text"
                  name="cardType"
                  defaultValue={defaultCard.cardType}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <Link
              to="/checkout"
              className="text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              &larr; Return to Shipping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
