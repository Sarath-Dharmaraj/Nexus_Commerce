import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMerchant } from "../../context/merchantContext";
import SuccessAlert from "./SuccessScrean";

// component beginning
function AddProducts() {
  const { state, dispatch } = useMerchant();
  const [isOpen, setOpen] = useState(false);
  const actionData = useActionData();
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state !== "idle";

  // existing data for editing inventory product
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [mainPreview, setMainPreview] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  useEffect(() => {
    if (state.screen === "ADD_PRODUCT") {
      if (state.isEdit && state.data) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTags(state.data.searchTags || []);
        setMainPreview(state.data.imageUrl || null);
        setAdditionalPreviews(state.data.additionalImages || []);
      } else {
        setTags([]);
        setMainPreview(null);
        setAdditionalPreviews([]);
        setAdditionalFiles([]);
        setInputValue("");
      }
    } else {
      setTags([]);
      setMainPreview(null);
      setAdditionalPreviews([]);
      setAdditionalFiles([]);
      setInputValue("");
    }
  }, [state.screen, state.isEdit, state.data]);

  const close = () => {
    dispatch({ type: "SET_SCREEN", payload: "WALLET" });
    setOpen(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (actionData?.success) setOpen(true);
  }, [actionData]);

  const labelClass = "text-sm font-semibold text-slate-800";
  const inputClass =
    "w-full bg-white border rounded-md border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-1 outline-none transition-all text-sm text-slate-700 placeholder-slate-400";
  const headerClass = "text-lg font-bold text-slate-800";

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTags = inputValue
        .split(/[\s,]+/)
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag !== "" && !tags.includes(tag));

      if (newTags.length > 0) {
        setTags([...tags, ...newTags]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setMainPreview(URL.createObjectURL(file));
  };

  const handleAdditionalImagesChange = (e) => {
    const incomingFiles = Array.from(e.target.files);
    if (incomingFiles.length === 0) return;

    const combinedFiles = [...additionalFiles, ...incomingFiles].slice(0, 4);
    setAdditionalFiles(combinedFiles);

    const newPreviews = incomingFiles.map((file) => URL.createObjectURL(file));
    setAdditionalPreviews((prev) => [...prev, ...newPreviews].slice(0, 4));

    const dataTransfer = new DataTransfer();
    combinedFiles.forEach((file) => dataTransfer.items.add(file));
    e.target.files = dataTransfer.files;
  };

  if (state.screen !== "ADD_PRODUCT") return null;

  return (
    <div className="relative w-full h-full bg-slate-50 px-8 py-5 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none">
      {isOpen && <SuccessAlert onClose={close} message={actionData?.message} />}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-2">
        <div className="text-slate-800 font-bold text-3xl ">
          {!state.isEdit ? "Add New SKU" : "Edit SKU"}
        </div>

        <Form
          method={state.isEdit ? "PUT" : "POST"}
          encType="multipart/form-data"
          className="flex flex-col gap-2"
        >
          <input
            type="hidden"
            name="intent"
            value={!state.isEdit ? "quick_add_product" : "edit_product"}
          />
          <div className="w-full flex flex-col">
            <label htmlFor="skuTitle" className={labelClass}>
              SKU Title
            </label>
            <input
              type="text"
              name="skuTitle"
              id="skuTitle"
              className={inputClass}
              placeholder="e.g., Premium Gadget"
              defaultValue={state.isEdit ? state.data?.skuTitle : ""}
              required
            />
          </div>

          <div className={headerClass}>Media Catalog</div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Primary Image</label>
              <label className="relative w-full h-30 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors overflow-hidden group">
                {mainPreview ? (
                  <img
                    src={mainPreview}
                    alt="Primary preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-slate-400 group-hover:text-blue-500 transition-colors">
                    +
                  </span>
                )}
                <input
                  type="file"
                  name="mainImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleMainImageChange}
                />
              </label>
              <p className="text-xs text-slate-500 mt-2">Image Upload Zone</p>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Additional Images (Up to 4)</label>
              <label className="w-full h-40 flex items-start gap-3 cursor-pointer">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-30 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors overflow-hidden group"
                  >
                    {additionalPreviews[i] ? (
                      <img
                        src={additionalPreviews[i]}
                        alt={`Preview ${i}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl text-slate-400 group-hover:text-blue-500">
                        +
                      </span>
                    )}
                  </div>
                ))}
                <input
                  type="file"
                  name="additionalImages"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleAdditionalImagesChange}
                />
              </label>
            </div>
          </div>

          <div className={headerClass}>Product Configuration</div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`w-full flex flex-col ${state.isEdit ? "block" : "hidden"}`}
            >
              <label htmlFor="skuId" className={labelClass}>
                SKU ID (Unique)
              </label>
              <input
                type="text"
                name="skuId"
                id="skuId"
                className={`${inputClass} ${state.isEdit ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`}
                placeholder="e.g., PG-1234"
                defaultValue={state.isEdit ? state.data?.skuId : ""}
                readOnly={state.isEdit}
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                name="category"
                className={inputClass}
                defaultValue={state.isEdit ? state.data?.category : "default"}
              >
                <option value="default" disabled className="text-slate-400">
                  Select Category...
                </option>
                <option value="electronic">Electronic</option>
                <option value="apparel">Apparel</option>
                <option value="home_goods">Home Goods</option>
                <option value="sports_outdoors">Sports & Outdoors</option>
                <option value="health_beauty">Health & Beauty</option>
              </select>
            </div>
          </div>

          <div className={headerClass}>Pricing & Inventory</div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex flex-col relative">
              <label htmlFor="price" className={labelClass}>
                Price (USD)
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  id="price"
                  className={`${inputClass} pl-8`}
                  placeholder="0.00"
                  defaultValue={state.isEdit ? state.data?.price : ""}
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="stockLevel" className={labelClass}>
                Initial Stock Level
              </label>
              <input
                type="number"
                name="stockLevel"
                className={inputClass}
                placeholder="0"
                defaultValue={state.isEdit ? state.data?.stockLevel : ""}
                required
              />
            </div>
          </div>

          <div className={headerClass}>Discoverability</div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="searchTags" className={labelClass}>
              Search Tags
            </label>
            <div
              className={`w-full bg-white border rounded-md border-slate-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-3 py-2 flex flex-wrap gap-2 items-center cursor-text transition-all min-h-10.5`}
              onClick={() => document.getElementById("tagInput").focus()}
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-sm flex items-center gap-1 transition-colors hover:bg-slate-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-red-500 focus:outline-none font-bold ml-1 text-xs"
                  >
                    &times;
                  </button>
                </span>
              ))}

              <input
                id="tagInput"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                placeholder={
                  tags.length === 0 ? "Type tag and press enter..." : ""
                }
                className="flex-1 min-w-50 outline-none text-sm bg-transparent placeholder-slate-400"
              />
            </div>

            {tags.map((tag, index) => (
              <input
                key={`hidden-${index}`}
                type="hidden"
                name="searchTags"
                value={tag}
              />
            ))}
          </div>

          <div className="w-full flex justify-end items-center gap-4 border-t mt-2 border-slate-200">
            <button
              type="submit"
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 mt-4 rounded-md font-semibold transition-colors shadow-sm"
            >
              +{" "}
              {state.isEdit
                ? isSubmitting
                  ? "Updating Catalog..."
                  : "Update Catalog"
                : isSubmitting
                  ? "Adding to Catalog"
                  : "Add to Catalog"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddProducts;
