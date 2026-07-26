import { MdCheckCircle } from "react-icons/md";

function SuccessAlert({ onClose, message }) {
  return (
    // Backdrop Wrapper
    <div className="absolute z-50 top-0 left-0 w-full h-full px-2 md:px-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      {/* Modal Box */}
      <div className="flex flex-col items-center justify-start w-100 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden tracking-tight font-hanken">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-4 py-3 bg-green-50 border-b border-green-100">
          <span className="flex items-center text-green-700 font-bold text-lg">
            <MdCheckCircle className="mr-2 text-xl" />
            Success
          </span>
          <button
            onClick={onClose}
            className="text-lg text-green-500 font-bold hover:text-green-800 hover:bg-green-200 px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="w-full px-8 py-8 text-center flex flex-col items-center gap-2">
          <p className="text-lg font-bold text-slate-800">
            {message || "Action completed successfully!"}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end w-full gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-white bg-green-600 border border-transparent rounded-xl hover:bg-green-700 shadow-sm transition-colors cursor-pointer"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessAlert;
