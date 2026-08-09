/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { useSettings } from "../../context/settingsContext";
import {
  MdEdit,
  MdDelete,
  MdAdd,
  MdStar,
  MdClose,
  MdCreditCard,
} from "react-icons/md";

function PaymentCard({ card, onEdit, fetcher }) {
  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to remove this payment method?")
    ) {
      fetcher.submit(
        {
          form_type: "CARDS",
          action_type: "DELETE",
          item_id: card._id,
        },
        { method: "POST", action: "/profile" },
      );
    }
  };

  const isDeleting =
    fetcher.state !== "idle" &&
    fetcher.formData?.get("action_type") === "DELETE" &&
    fetcher.formData?.get("item_id") === card._id;

  return (
    <div
      className={`relative flex flex-col items-start justify-between px-5 py-2 h-48 border rounded-md transition-all ${
        card.isDefault
          ? "border-blue-500 bg-blue-50/30 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      {card.isDefault && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-md rounded-tr-sm inline-flex items-center gap-1 uppercase tracking-wider">
          <MdStar /> Default
        </span>
      )}

      <div className="flex flex-col gap- text-sm text-slate-600 mt-2 w-full">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-slate-800 text-lg capitalize flex items-center gap-2">
            <MdCreditCard className="text-2xl text-slate-400" />
            {card.cardType}
          </span>
        </div>

        <div className="font-mono font-bold text-slate-700 text-base tracking-widest mt-2">
          •••• •••• •••• {card.lastFourDigit}
        </div>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Exp: {card.expireDate}
        </span>
      </div>

      <div className="flex items-center gap-4 w-full mt-4 pt-4 border-t border-slate-100">
        <button
          onClick={() => onEdit(card)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
        >
          <MdEdit /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-xs font-bold text-red-500 hover:text-red-700 inline-flex items-center gap-1 transition-colors"
        >
          <MdDelete /> Remove
        </button>
      </div>
    </div>
  );
}

function Payments() {
  const user = useSettings() || {};
  const payments = user.paymentMethod || [];
  const fetcher = useFetcher();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      closeModal();
    }
  }, [fetcher.state, fetcher.data]);

  const openModal = (card = null) => {
    setEditData(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const inputClass =
    "w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-slate-800 text-sm";
  const labelClass =
    "block text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase";

  const isSubmitting = fetcher.state !== "idle";

  return (
    <div className="w-full h-full flex flex-col items-start px-8 py-8 relative">
      <div className="mb-6 w-full border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-800">Payment Methods</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your saved cards for a seamless checkout experience.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          onClick={() => openModal()}
          className="flex flex-col items-center justify-center p-5 h-48 border-2 border-dashed border-slate-300 rounded-md bg-slate-50 text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
        >
          <MdAdd className="text-4xl mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Add New Card</span>
        </div>

        {payments.map((card) => (
          <PaymentCard
            key={card._id}
            card={card}
            onEdit={openModal}
            fetcher={fetcher}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                {editData ? "Edit Card" : "Add New Card"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <fetcher.Form
              method="POST"
              action="/profile"
              className="p-6 flex flex-col gap-5"
            >
              <input type="hidden" name="form_type" value="CARDS" />
              <input
                type="hidden"
                name="action_type"
                value={editData ? "EDIT" : "ADD"}
              />
              {editData && (
                <input type="hidden" name="item_id" value={editData._id} />
              )}

              <div>
                <label className={labelClass}>Card Network</label>
                <select
                  name="card_type"
                  defaultValue={editData?.cardType || "visa"}
                  className={inputClass}
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Last 4 Digits</label>
                  <input
                    type="text"
                    name="card_digit"
                    defaultValue={editData?.lastFourDigit}
                    className={inputClass}
                    placeholder="e.g. 4242"
                    maxLength="4"
                    pattern="\d{4}"
                    title="Please enter exactly 4 digits"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Expiry Date</label>
                  <input
                    type="text"
                    name="card_ExpireOn"
                    defaultValue={editData?.expireDate}
                    className={inputClass}
                    placeholder="MM/YY"
                    maxLength="5"
                    pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                    title="Format: MM/YY"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="card_isDefault"
                  id="card_isDefault"
                  defaultChecked={editData?.isDefault}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="card_isDefault"
                  className="text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Set as default payment method
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 rounded-sm font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-2 rounded-sm text-white font-bold text-sm shadow-sm transition-all ${
                    isSubmitting
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-black hover:bg-slate-800 hover:shadow-md"
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save Card"}
                </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
