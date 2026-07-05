import { useState } from "react";
import { useProfile } from "../../context/profileContext";
import { MdLocationPin, MdEdit, MdDelete } from "react-icons/md";
import DeletionAlert from "./DeletionAlert";

function AddressList() {
  const { state, dispatch, userData } = useProfile();

  const [deleteConfig, setDeleteConfig] = useState({
    isOpen: false,
    itemId: null,
  });

  if (!state.isAddressListOpen) return null;

  return (
    <>
      <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full px-2 md:px-0 flex items-center justify-around bg-black/30 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-start h-120 w-150 py-4 bg-slate-50 border rounded-2xl border-slate-200 shadow-2xl overflow-hidden tracking-tight font-hanken">
          <div className="flex items-center justify-between w-full px-4 border-b border-slate-200 pb-2 shrink-0">
            <span className="inline-flex items-center text-lg font-bold text-slate-800">
              <MdLocationPin className="mx-2 text-xl text-slate-500" />
              Manage Addresses
            </span>
            <span
              className="text-2xl text-slate-800 font-bold hover:text-black border border-transparent hover:border-slate-200 rounded-lg hover:bg-slate-100 px-2 cursor-pointer transition-colors"
              onClick={() => dispatch({ type: "CLOSE_ALL" })}
            >
              ×
            </span>
          </div>

          <div className="flex flex-col w-full px-4 md:px-8 py-4 gap-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300">
            {userData?.address?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-4 border border-slate-200 bg-white rounded-xl shadow-sm"
              >
                <div className="flex flex-col text-sm text-slate-600">
                  <span className="font-bold text-slate-800">
                    {item.street} {item.suite && `, ${item.suite}`}
                  </span>
                  <span>
                    {item.city}, {item.state} {item.zipCode}
                  </span>
                  <span className="text-xs text-slate-400">{item.country}</span>
                  {item.isPrimary && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded w-fit mt-1">
                      PRIMARY
                    </span>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      dispatch({ type: "OPEN_ADD_ADDRESS", payload: item })
                    }
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                    title="Edit Address"
                  >
                    <MdEdit className="text-xl" />
                  </button>

                  <button
                    onClick={() =>
                      setDeleteConfig({ isOpen: true, itemId: item._id })
                    }
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-200"
                    title="Delete Address"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Button */}
            <button
              onClick={() => dispatch({ type: "OPEN_ADD_ADDRESS" })}
              className="w-full py-3 mt-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            >
              + Add New Address
            </button>
          </div>
        </div>
      </div>

      <DeletionAlert
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig({ isOpen: false, itemId: null })}
        itemType="address"
        itemId={deleteConfig.itemId}
      />
    </>
  );
}

export default AddressList;
