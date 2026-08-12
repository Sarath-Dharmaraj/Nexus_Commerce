import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArticle } from "react-icons/md";
import useCheckout from "../../context/checkoutContext";

function CartItemCard({ item }) {
  const nav = useNavigate();
  const product = item.productId;

  return (
    <div
      onClick={() => nav(`/product/${product._id}`)}
      className="w-full flex items-start gap-2 text-xs text-slate-600 font-bold font-hanken px-2 md:px-4 py-2 bg-slate-100 border rounded-xs border-slate-200 cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt=""
        className="w-8 h-8 inline-flex items-center justify-center"
      />
      <div className="flex-1 flex flex-col items-start justify-center">
        <div className="line-clamp-1">{product.skuTitle}</div>
        <div>{product.skuId}</div>
      </div>
      <div className="flex flex-col items-end justify-center text-slate-800 shrink-0">
        <div>
          $
          {product.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </div>
        <div className="self-end">
          <span className="text-slate-600 font-normal"> Qty: </span>
          {item.quantity}
        </div>
      </div>
    </div>
  );
}

function CartSummary({ cart }) {
  const { state } = useCheckout();
  const fetcher = useFetcher();
  const location = useLocation();
  const nav = useNavigate();
  console.log(state);
  const submitData = () =>
    fetcher.submit(
      {
        address: state.address,
        payment: state.payment,
      },
      { method: "post", action: "/checkout/payment" },
    );

  const subTotal =
    cart?.reduce(
      (acc, item) => acc + (item.quantity * item.productId.price || 0),
      0,
    ) || 0;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className="w-full lg:w-[30%] shrink-0 h-fit max-h-[60vh] lg:max-h-full bg-white px-3 md:px-4 py-4 md:py-5 flex flex-col gap-3 border rounded-md border-slate-200 shadow-2xs overflow-hidden mb-6 lg:mb-0">
      <div className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-800 tracking-wider mb-2 md:mb-4 shrink-0">
        <span>
          <MdOutlineArticle />{" "}
        </span>
        Order Summary{" "}
      </div>
      <div className="w-full h-auto flex flex-col gap-1 overflow-auto scrollbar-thin scrollbar-thumb-blue-100 ">
        {cart?.map((item) => {
          return <CartItemCard key={item._id} item={item} />;
        })}
      </div>
      <div className="w-full h-px border border-slate-200 shrink-0"></div>
      <div className="w-full flex flex-col items-start justify-between px-1 md:px-2 py-1 md:py-2 tracking-wider text-sm md:text-base text-slate-600 shrink-0">
        <div className="w-full flex items-start justify-between">
          <span className="flex-1 ">Subtotal ({totalItems} items): </span>
          <span className="text-slate-800 font-black">
            ${subTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="w-full flex items-start justify-between">
          <span className="flex-1 ">Shipping: </span>
          <span className="text-slate-600 font-normal tracking-tight">
            Free of Charges
          </span>
        </div>
      </div>
      <div className="w-full h-px border border-slate-200 shrink-0"></div>
      <div className="w-full flex items-start justify-between px-1 md:px-2 py-1 md:py-2 tracking-wider text-sm md:text-base text-slate-600 shrink-0">
        <span className="flex-1 ">Total: </span>
        <span className="text-slate-800 font-black">
          <span className="text-xs font-light">USD</span> $
          {subTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="w-full h-px border border-slate-200 shrink-0"></div>
      <div className="w-full m-auto flex items-center justify-center shrink-0 pt-2">
        <button
          type="submit"
          onClick={
            location.pathname === "/checkout"
              ? () => nav("/checkout/payment")
              : () => submitData()
          }
          className="bg-black text-white px-4 md:px-6 py-2.5 text-sm md:text-base w-full md:w-auto rounded-sm hover:scale-105 transition-transform cursor-pointer"
        >
          {location.pathname === "/checkout"
            ? "Continue to Payment"
            : "Confirm Purchase"}
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
