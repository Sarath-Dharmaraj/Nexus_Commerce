import { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import { useProfile } from "../../context/profileContext";
import { MdCheckCircle, MdClose } from "react-icons/md";

function SubmissionAlert() {
  const { dispatch } = useProfile();
  const [isActive, setActive] = useState(false);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.success) {
      dispatch({ type: "CLOSE_ALL" });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(true);

      const timer = setTimeout(() => {
        setActive(false);
      }, 50000);

      return () => clearTimeout(timer);
    }
  }, [actionData, dispatch]);
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm transition-opacity">
      {/* Main Alert Card */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm p-8 bg-white border border-slate-100 shadow-2xl rounded-2xl tracking-tight font-hanken">
        {/* Absolute Close Button */}
        <button
          onClick={() => setActive(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close alert"
        >
          <MdClose className="text-2xl" />
        </button>

        {/* Success Icon Circle */}
        <div className="flex items-center justify-center w-16 h-16 mb-5 bg-green-50 text-green-500 rounded-full">
          <MdCheckCircle className="text-4xl" />
        </div>

        {/* Text Content */}
        <h3 className="mb-2 text-2xl font-bold text-slate-800 text-center">
          Success!
        </h3>

        <p className="text-sm font-medium text-slate-500 text-center">
          {actionData?.message || "Your changes have been saved successfully."}
        </p>
      </div>
    </div>
  );
}

export default SubmissionAlert;
