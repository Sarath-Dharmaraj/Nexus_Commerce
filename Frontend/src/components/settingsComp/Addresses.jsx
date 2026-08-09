/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { useSettings } from "../../context/settingsContext";
import { MdEdit, MdDelete, MdAdd, MdStar, MdClose } from "react-icons/md";


function AddressCard({ address, onEdit, fetcher }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      fetcher.submit(
        {
          form_type: "ADDRESS",
          action_type: "DELETE",
          item_id: address._id,
        },
        { method: "POST", action: "/profile" },
      );
    }
  };

  const isDeleting =
    fetcher.state !== "idle" &&
    fetcher.formData?.get("action_type") === "DELETE" &&
    fetcher.formData?.get("item_id") === address._id;

  return (
    <div
      className={`relative flex flex-col items-start justify-between p-5 h-48 border rounded-md transition-all ${
        address.isPrimary
          ? "border-blue-500 bg-blue-50/30 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      {address.isPrimary && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-md rounded-tr-sm inline-flex items-center gap-1 uppercase tracking-wider">
          <MdStar /> Default
        </span>
      )}

      <div className="flex flex-col gap-1 text-sm text-slate-600 mt-2">
        <span className="font-bold text-slate-800 text-base">
          {address.street} {address.suite ? `, ${address.suite}` : ""}
        </span>
        <span>
          {address.city}, {address.state} {address.zipCode}
        </span>
        <span>{address.country}</span>
      </div>

      <div className="flex items-center gap-4 w-full mt-4 pt-4 border-t border-slate-100">
        <button
          onClick={() => onEdit(address)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
        >
          <MdEdit /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-xs font-bold text-red-500 hover:text-red-700 inline-flex items-center gap-1 transition-colors"
        >
          <MdDelete /> Delete
        </button>
      </div>
    </div>
  );
}


function Addresses() {
  const user = useSettings() || {};
  const addresses = user.address || [];
  const fetcher = useFetcher();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null); 

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      closeModal();
    }
  }, [fetcher.state, fetcher.data]);

  const openModal = (address = null) => {
    setEditData(address);
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
        <h2 className="text-2xl font-black text-slate-800">Saved Addresses</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your shipping and billing addresses for faster checkout.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          onClick={() => openModal()}
          className="flex flex-col items-center justify-center p-5 h-48 border-2 border-dashed border-slate-300 rounded-md bg-slate-50 text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
        >
          <MdAdd className="text-4xl mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Add New Address</span>
        </div>

        {addresses.map((addr) => (
          <AddressCard
            key={addr._id}
            address={addr}
            onEdit={openModal}
            fetcher={fetcher}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-md shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                {editData ? "Edit Address" : "Add New Address"}
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
              className="p-6 flex flex-col gap-4"
            >
              <input type="hidden" name="form_type" value="ADDRESS" />
              <input
                type="hidden"
                name="action_type"
                value={editData ? "EDIT" : "ADD"}
              />
              {editData && (
                <input type="hidden" name="item_id" value={editData._id} />
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    defaultValue={editData?.street}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Apt, Suite, Unit</label>
                  <input
                    type="text"
                    name="suite"
                    defaultValue={editData?.suite}
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={editData?.city}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>State / Province</label>
                  <input
                    type="text"
                    name="state"
                    defaultValue={editData?.state}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Zip / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    defaultValue={editData?.zipCode}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClass}>Country</label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={editData?.country}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="isPrimary"
                  id="isPrimary"
                  defaultChecked={editData?.isPrimary}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="isPrimary"
                  className="text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Set as default shipping address
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
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
                  {isSubmitting ? "Saving..." : "Save Address"}
                </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addresses;
