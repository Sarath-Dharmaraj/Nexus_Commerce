/* eslint-disable react-hooks/set-state-in-effect */
import { useFetcher } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";

function CartItemCard({ item }) {
  const fetcher = useFetcher();
  const product = item.productId;

  const [quantity, setQuantity] = useState(item.quantity);
  const maxStock = product.stockLevel || 99;

  useEffect(() => {
    if (fetcher.state === "idle" && item.quantity !== quantity) {
      setQuantity(item.quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  useEffect(() => {
    if (quantity === item.quantity || quantity === "") return;

    const timer = setTimeout(() => {
      fetcher.submit(
        {
          intent: "update_quantity",
          productId: product._id,
          quantity: quantity,
        },
        { method: "post" },
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [quantity, item.quantity, product._id, fetcher]);

  const handleDelete = () => {
    fetcher.submit(
      { intent: "remove_item", productId: product._id },
      { method: "post" },
    );
  };

  function handleInputChange(value, e) {
    switch (value) {
      case "INCREMENT": {
        if (quantity < maxStock) setQuantity((prev) => prev + 1);
        break;
      }
      case "DECREMENT": {
        if (quantity > 1) setQuantity((prev) => prev - 1);
        break;
      }
      case "INPUT": {
        const rawValue = e.target.value;
        if (rawValue === "") {
          setQuantity("");
          break;
        }
        const val = parseInt(rawValue);
        if (!isNaN(val)) {
          if (val > maxStock) setQuantity(maxStock);
          else setQuantity(val);
        }
        break;
      }
      default:
        break;
    }
  }

  const isDeleting =
    fetcher.state !== "idle" &&
    fetcher.formData?.get("intent") === "remove_item";

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 px-4 py-4 sm:py-3 border border-slate-200 rounded-md shadow-sm bg-white transition-opacity duration-300 ${
        isDeleting ? "opacity-30 scale-95" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between w-full sm:w-auto sm:flex-1 gap-3 sm:gap-4 min-w-0">
        <div className="w-20 h-20 shrink-0 bg-slate-50 rounded-md flex items-center justify-center overflow-hidden border border-slate-100">
          <img
            src={product.imageUrl}
            alt={product.skuTitle}
            className="w-full h-full object-contain mix-blend-multiply p-1"
          />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center gap-1 min-w-0 pt-1 sm:pt-0">
          <span className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 sm:truncate w-full pr-1">
            {product.skuTitle}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
            SKU: {product.skuId}
          </span>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="sm:hidden p-1.5 -mr-1.5 -mt-1.5 text-slate-400 hover:text-red-500 rounded-full transition-all disabled:opacity-50 shrink-0"
        >
          <MdOutlineDelete className="text-xl" />
        </button>
      </div>

      {/* Bottom section on mobile: Price + Controls + Desktop Delete */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-2 sm:mt-0 sm:pl-4">
        <span className="font-black text-slate-900 text-base md:text-lg">
          ${" "}
          {Number(product.price * quantity || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </span>

        <div className="flex items-center border rounded-sm border-slate-300 overflow-hidden bg-white shrink-0">
          <button
            type="button"
            onClick={() => handleInputChange("DECREMENT")}
            className="w-8 py-1 hover:bg-slate-100 text-slate-500 font-bold"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleInputChange("INPUT", e)}
            onBlur={() => {
              if (quantity === "" || quantity < 1) setQuantity(1);
            }}
            className="w-10 text-center text-sm font-bold text-slate-700 bg-transparent focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
          <button
            type="button"
            onClick={() => handleInputChange("INCREMENT")}
            className="w-8 py-1 hover:bg-slate-100 text-slate-500 font-bold"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="hidden sm:block p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50 shrink-0"
        >
          <MdOutlineDelete className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default CartItemCard;
