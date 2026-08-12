/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { useSettings } from "../../context/settingsContext";
import {
  MdCheckCircle,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

function SecurityLogin() {
  const user = useSettings() || {};
  const fetcher = useFetcher();

  const [isVerified, setIsVerified] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.intent === "verify_password" && fetcher.data.success) {
        setIsVerified(true);
      }
      if (fetcher.data.intent === "update_security" && fetcher.data.success) {
        setIsVerified(false);
        setShowNewPass(false);
        setShowConfirmPass(false);
      }
    }
  }, [fetcher.state, fetcher.data]);

  const handleUpdateSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const newPass = formData.get("newPassword");
    const confirmPass = formData.get("confirmPassword");

    if (newPass && newPass !== confirmPass) {
      e.preventDefault();
      setConfirmError("New passwords do not match.");
    } else {
      setConfirmError("");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-slate-800 text-sm";
  const labelClass =
    "block text-xs font-bold text-slate-600 tracking-wider mb-1.5 uppercase";
  const disabledInputClass =
    "w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-md bg-slate-50 text-slate-400 cursor-not-allowed text-sm";

  const eyeBtnClass =
    "absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 focus:outline-none transition-colors";

  const isSubmitting = fetcher.state !== "idle";
  const verifying =
    isSubmitting && fetcher.formData?.get("intent") === "verify_password";
  const updating =
    isSubmitting && fetcher.formData?.get("intent") === "update_security";

  return (
    <div className="w-full h-full flex flex-col items-start px-4 sm:px-6 md:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8 w-full border-b border-slate-200 pb-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-800">
          Security & Login
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Update your email address or change your password securely.
        </p>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-6 md:gap-8">
        {fetcher.data && !fetcher.data.success && (
          <div className="w-full p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
            {fetcher.data.errorMsg || fetcher.data.message}
          </div>
        )}
        {fetcher.data?.success && fetcher.data.intent === "update_security" && (
          <div className="w-full p-3 bg-green-50 text-green-700 border border-green-200 rounded text-sm flex items-center gap-2">
            <MdCheckCircle className="text-lg" />
            {fetcher.data.message}
          </div>
        )}

        <div
          className={`p-4 sm:p-6 border rounded-md transition-colors ${isVerified ? "bg-green-50/50 border-green-200" : "bg-slate-50 border-slate-200"}`}
        >
          {isVerified ? (
            <div className="flex items-center gap-3 text-green-700">
              <MdCheckCircle className="text-2xl" />
              <div>
                <p className="font-bold">Identity Verified</p>
                <p className="text-xs">
                  You may now update your security credentials below.
                </p>
              </div>
            </div>
          ) : (
            <fetcher.Form method="POST" className="flex flex-col gap-4">
              <input type="hidden" name="intent" value="verify_password" />

              <div className="relative">
                <label htmlFor="currentPassword" className={labelClass}>
                  Verify Current Password
                </label>
                <input
                  type={showCurrentPass ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Enter your current password"
                  className={inputClass}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className={eyeBtnClass}
                >
                  {showCurrentPass ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between mt-2 gap-4 sm:gap-0">
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline text-center sm:text-left">
                  Forgot Password?
                </span>

                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full sm:w-auto bg-slate-800 text-white px-6 py-2 rounded-sm hover:bg-black transition-colors font-bold text-sm disabled:bg-slate-400"
                >
                  {verifying ? "Verifying..." : "Verify Identity"}
                </button>
              </div>
            </fetcher.Form>
          )}
        </div>

        <div className="relative">
          {!isVerified && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-md">
              <MdLockOutline className="text-4xl text-slate-400 mb-2" />
              <span className="text-sm font-bold text-slate-500">
                Verify password to unlock
              </span>
            </div>
          )}

          <fetcher.Form
            method="POST"
            onSubmit={handleUpdateSubmit}
            className="flex flex-col gap-4 md:gap-5"
          >
            <input type="hidden" name="intent" value="update_security" />

            <div>
              <label htmlFor="newEmail" className={labelClass}>
                New Email Address
              </label>
              <input
                type="email"
                name="newEmail"
                id="newEmail"
                defaultValue={user.email}
                className={isVerified ? inputClass : disabledInputClass}
                disabled={!isVerified}
              />
            </div>

            <div className="h-px w-full bg-slate-100 my-1"></div>

            <div className="relative">
              <label htmlFor="newPassword" className={labelClass}>
                New Password (Optional)
              </label>
              <input
                type={showNewPass ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder={isVerified ? "Enter new password" : "••••••••"}
                className={isVerified ? inputClass : disabledInputClass}
                disabled={!isVerified}
              />
              {isVerified && (
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className={eyeBtnClass}
                >
                  {showNewPass ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              )}
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm New Password
              </label>
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder={isVerified ? "Re-type new password" : "••••••••"}
                className={isVerified ? inputClass : disabledInputClass}
                disabled={!isVerified}
              />
              {isVerified && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className={eyeBtnClass}
                >
                  {showConfirmPass ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              )}
              {confirmError && (
                <p className="text-red-500 text-xs mt-1 font-semibold">
                  {confirmError}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-end">
              <button
                type="submit"
                disabled={!isVerified || updating}
                className={`w-full sm:w-auto px-8 py-2.5 rounded-sm text-white font-bold text-sm shadow-sm transition-all ${
                  !isVerified || updating
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                }`}
              >
                {updating ? "Saving..." : "Update Security Settings"}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

export default SecurityLogin;
