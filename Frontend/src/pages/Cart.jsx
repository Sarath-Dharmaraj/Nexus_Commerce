/* eslint-disable react-hooks/set-state-in-effect */
import { useLoaderData } from "react-router-dom";
import { MdOutlineArrowForward } from "react-icons/md";

import CartItemCard from "../components/checkoutComp/CartItemCard";
import Footer from "../components/protectedPageComp/Footer";

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
