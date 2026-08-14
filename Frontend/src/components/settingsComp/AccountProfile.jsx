import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useSettings } from "../../context/settingsContext";
import { MdPhotoCamera, MdStorefront } from "react-icons/md";

function AccountProfile() {
  const user = useSettings() || {};
  const fetcher = useFetcher();

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(
    user.profileImage || "https://via.placeholder.com/150",
  );

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-slate-800 text-sm";
  const labelClass =
    "block text-xs font-bold text-slate-600 tracking-wider mb-1.5 uppercase";

  const isSubmitting = fetcher.state !== "idle";
  const isAlreadySeller = user.systemRoles?.includes("Seller");

  return (
    <div className="w-full h-full flex flex-col items-start px-4 sm:px-6 md:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8 w-full border-b border-slate-200 pb-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-800">
          Account & Profile
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal information and profile picture.
        </p>
      </div>

      <fetcher.Form
        method="POST"
        action="/profile"
        encType="multipart/form-data"
        className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-w-4xl"
      >
        <input type="hidden" name="form_type" value="PROFILE_DATA" />

        <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
          <div
            className="relative group cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              src={imagePreview}
              alt="profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MdPhotoCamera className="text-white text-2xl md:text-3xl" />
            </div>
          </div>

          <input
            type="file"
            name="profileImage"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleImageClick}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Change Picture
          </button>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-5 md:gap-6">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              defaultValue={user.fullName}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              className={`${inputClass} bg-slate-50 cursor-not-allowed text-slate-500`}
              readOnly
            />
            <p className="text-[10px] text-slate-400 mt-1 font-semibold tracking-wide">
              Email cannot be changed directly for security reasons.
            </p>
          </div>

          <div>
            <label htmlFor="contact" className={labelClass}>
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              id="contact"
              defaultValue={user.contact}
              className={inputClass}
              required
            />
          </div>

          {!isAlreadySeller && (
            <div className="flex items-center border rounded-md border-blue-200 bg-blue-50/50 py-3 px-4 mt-2">
              <div className="flex items-center justify-between gap-x-3 w-fit">
                <MdStorefront className="text-2xl md:text-3xl text-blue-600" />
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    Apply for Merchant Account
                  </p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">
                    I want to start selling products on Nexus Commerce.
                  </p>
                </div>
              </div>
              <label className="flex items-center justify-end flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  name="applyMerchant"
                  value="true"
                  className="sr-only peer"
                />
                <div className="relative flex items-center w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 mt-2 flex flex-col sm:flex-row justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-2.5 rounded-sm text-white font-bold text-sm shadow-sm transition-all ${
                isSubmitting
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-black hover:bg-slate-800 hover:shadow-md"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default AccountProfile;
