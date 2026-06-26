import { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import { useProfile } from "../../context/profileContext";

function SubmissionAlert() {
  const { dispatch } = useProfile();
  const [isActive, setActive] = useState(false);
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.success) {
      dispatch({ type: "CLOSE_ALL" });
      setActive(true);

      const timer = setTimeout(() => {
        setActive(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [actionData]);

  if (!isActive) return null;
  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full px-2 md:px-0 flex items-center justify-around bg-black/30">
      <div className=" flex flex-col items-start justify-around w-150 border rounded-lg border-slate-200 bg-slate-50 shadow-2xl  tracking-tight text-sm md:text-2xl text-slate-600 px-5">
        <span
          className="self-end text-slate-800 font-bold border rounded-sm border-slate-50 hover:bg-slate-100 hover:border-slate-400 px-2 my-2"
          onClick={() => setActive(false)}
        >
          X
        </span>
        <div className="border border-slate-50 border-t-slate-200 w-full">
          <div className=" py-5 px-3 text-center">
            {/* { actionData.formtype === "CARD" ? "Card Method successfully added" : "Address successfully added"} */}
            Cards has been successfully added
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionAlert;
