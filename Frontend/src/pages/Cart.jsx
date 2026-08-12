/* eslint-disable react-hooks/set-state-in-effect */
import { useLoaderData, Link } from "react-router-dom";
import { MdOutlineArrowForward } from "react-icons/md";

import CartItemCard from "../components/checkoutComp/CartItemCard";
import Footer from "../components/protectedPageComp/Footer";

function OrderSummary({ totalPrice, items }) {
  const sectionStyling =
    "w-full flex items-center justify-between gap-2 text-slate-600 tracking-tighter font-light text-sm md:text-base";

  return (
    <div className="w-full flex flex-col items-start justify-around gap-4">
      <h3 className="font-bold text-slate-800 text-xl mb-2 md:mb-4">
        Order Summary
      </h3>
      <span className="h-px w-full border border-slate-200"> </span>
      <div className="w-full flex flex-col items-start justify-around gap-2">
        <div className={sectionStyling}>
          <span>Subtotal ({items})</span>
          <span>
            ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className={sectionStyling}>
          <span>Estimated Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className={sectionStyling}>
          <span>Estimated Tax</span>
          <span>Calculated at checkout</span>
        </div>
      </div>
      <span className="h-px w-full border border-slate-200 mt-2 md:mt-auto"></span>
      <div className={sectionStyling}>
        <span className="font-bold text-slate-800 text-lg">Total: </span>
        <span className="font-bold text-slate-800 text-lg">
          ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="flex items-center justify-around w-full mt-2">
        <Link
          to="/checkout"
          className="w-full text-center px-4 py-3 md:py-2 bg-blue-600 text-white flex items-center justify-center gap-2 border rounded-md hover:scale-[0.98] transition-transform font-bold"
        >
          Proceed to checkout
          <span>
            <MdOutlineArrowForward className="text-lg" />
          </span>
        </Link>
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
    <div className="w-full min-h-screen text-slate-600 font-hanken tracking-tight flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-start md:px-8 lg:px-12 py-6 md:py-8 gap-6 md:gap-8">
        <div className="flex flex-col items-start px-4 md:px-6 gap-1 md:gap-2 w-full">
          <h1 className="text-3xl md:text-4xl text-slate-800 font-black">
            Shopping Cart
          </h1>
          <span className="tracking-wider text-sm md:text-base">
            Review your items and proceed to secure checkout
          </span>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 px-4 md:px-6 pb-8">
          <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col gap-3 md:gap-4">
            {cart?.map((item) => {
              return <CartItemCard key={item._id} item={item} />;
            })}
          </div>

          <div className="w-full lg:w-[35%] xl:w-[30%] lg:sticky lg:top-8 border rounded-md border-slate-200 bg-slate-50 p-5 md:p-6 shadow-sm shrink-0">
            <OrderSummary totalPrice={subtotal} items={cart.length} />
          </div>
        </div>
      </div>

      <div className="w-full shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
