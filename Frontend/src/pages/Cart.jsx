/* eslint-disable react-hooks/set-state-in-effect */
import { useFetcher, useLoaderData } from "react-router-dom";
import { MdOutlineDelete, MdOutlineArrowForward } from "react-icons/md";
import Footer from "../components/protectedPageComp/Footer";
import { useEffect, useState } from "react";

function OrderSummary({ totalPrice, items }) {
  const sectionStyling =
    "w-full flex items-center justify-around gap-2 text-slate-600 tracking-tighter font-light";
  return (
    <div className="w-full flex flex-col items-start justify-around gap-4">
      <h3 className="font-bold text-slate-800 text-xl mb-4">Order Summary</h3>
      <span className="h-px w-full border border-slate-200"> </span>
      <div className="flex flex-col items-start justify-around gap-1">
        <div className={sectionStyling}>
          <span className="flex-1">Subtotal ({items})</span>
          <span>
            ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className={sectionStyling}>
          <span className="flex-1">Estimated Shipping</span>
          <span>calculated on checkout</span>
        </div>
        <div className={sectionStyling}>
          <span className="flex-1">Estimated Tax</span>
          <span>calculated on checkout </span>
        </div>
      </div>
      <span className="h-px w-full border border-slate-200 mt-auto"></span>
      <div className={sectionStyling}>
        <span className="flex-1 font-bold text-slate-800 text-lg">Total: </span>
        <span className="font-bold text-slate-800 text-lg">
          ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="flex items-center justify-around w-full">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white flex items-center justify-around gap-1 border rounded-md hover:scale-95"
        >
          Prodceed to checkout{" "}
          <span>
            <MdOutlineArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
}

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
      className={`w-full flex items-center gap-4 px-4 py-3 border border-slate-200 rounded-md shadow-sm bg-white transition-opacity duration-300 ${isDeleting ? "opacity-30 scale-95" : "opacity-100"}`}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-50 rounded-md flex items-center justify-center overflow-hidden border border-slate-100">
        <img
          src={product.imageUrl}
          alt={product.skuTitle}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="flex-1 flex flex-col items-start justify-center gap-1 min-w-0">
        <span className="font-bold text-slate-800 text-sm md:text-base truncate w-full">
          {product.skuTitle}
        </span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          SKU: {product.skuId}
        </span>
      </div>

      <div className="flex flex-col items-end justify-center gap-2 pr-2 sm:pr-4">
        <span className="font-black text-slate-900 text-sm md:text-base">
          ${" "}
          {Number(product.price * quantity || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </span>

        <div className="flex items-center border rounded-sm border-slate-300 overflow-hidden bg-white">
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
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50"
      >
        <MdOutlineDelete className="text-xl" />
      </button>
    </div>
  );
}

function Cart() {
  const { cart } = useLoaderData();

  const subtotal =
    cart?.reduce((acc, item) => {
      return acc + item.quantity * (item.productId.price || 0);
    }, 0) || 0;

  return (
    <div className="w-full h-full text-slate-600 font-hanken tracking-tight flex flex-col items-start md:px-12 py-8 gap-4 md:overflow-hidden">
      <div className="flex flex-col items-start px-6 py-4 gap-2 h-full">
        <h1 className="text-4xl text-slate-800 font-black">Shopping Cart</h1>
        <span className="tracking-wider">
          Review your items and proceed to secure checkout
        </span>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6 px-6">
        <div className="w-full md:w-[70%] flex flex-col gap-3 md:overflow-auto md:max-h-90 scrollbar-thin scrollbar-thumb-blue-100 pb-4">
          {cart?.map((item) => {
            return <CartItemCard key={item._id} item={item} />;
          })}
        </div>

        <div className="w-full md:w-[30%] border rounded-md border-slate-200 bg-slate-50 min-h-75 p-6">
          <OrderSummary totalPrice={subtotal} items={cart.length} />
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
