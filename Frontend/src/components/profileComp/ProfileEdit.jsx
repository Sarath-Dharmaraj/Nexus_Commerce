import { useState } from "react";
import { Form } from "react-router-dom";
import { useProfile } from "../../context/profileContext";
import { MdOutlinePerson } from "react-icons/md";

function ProfileEdit() {
  const { state, dispatch, userData } = useProfile();

  // 1. Initialize preview state with user's current image, falling back to profile.png
  const [imagePreview, setImagePreview] = useState(
    userData?.profileImage || "profile.png",
  );

  // 2. Handle file selection to instantly update the circular preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!state.isProfileEditOpen) return null;

  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full px-2 md:px-0 flex items-center justify-around bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-around tracking-tight font-hanken w-150 py-4 bg-slate-50 border rounded-2xl border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between w-full px-4 border-b border-slate-200 pb-2">
          <span className="inline-flex items-center text-lg font-bold text-slate-800">
            <MdOutlinePerson className="mx-2 text-xl text-slate-500" />
            Edit Profile Data
          </span>
          <span
            className="text-2xl text-slate-800 font-bold hover:text-black border border-transparent hover:border-slate-200 rounded-lg hover:bg-slate-100 px-2 cursor-pointer transition-colors"
            onClick={() => dispatch({ type: "CLOSE_ALL" })}
          >
            ×
          </span>
        </div>

        <div className="flex flex-col items-start w-full px-4 md:px-14 py-8 text-slate-600 font-bold">
          <Form
            method="post"
            className="w-full flex flex-col gap-6"
            encType="multipart/form-data"
          >
            <input type="hidden" name="form_type" value="PROFILE_DATA" />

            {/* --- NEW: Centered Image Preview & Upload Button --- */}
            <div className="flex flex-col items-center w-full gap-3 mt-2">
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md bg-slate-200"
              />

              {/* This label acts as the visual button */}
              <label
                htmlFor="profileImage"
                className="cursor-pointer text-xs md:text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-4 py-2 rounded-lg transition-colors"
              >
                Upload New Image
              </label>

              {/* The actual input is hidden. Note: removed defaultValue as it breaks file inputs */}
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {/* ------------------------------------------------ */}

            <div className="flex flex-col items-start w-full gap-1 text-sm font-semibold text-slate-700">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                defaultValue={userData?.fullName || ""}
                className="w-full px-3 py-2 border rounded-lg border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:outline-none text-sm font-medium bg-slate-50/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="bg-slate-900 hover:bg-blue-600 px-5 py-2 w-full md:w-fit text-white font-bold text-sm border rounded-xl self-end shadow-sm transition-colors cursor-pointer mt-4"
            >
              Save Profile
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
