import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArticle } from "react-icons/md";

function CartItemCard({ item }) {
  const nav = useNavigate();
  const product = item.productId;

  return (
    <div
      onClick={() => nav(`/product/${product._id}`)}
      className="w-full flex items-start gap-2 text-xs text-slate-600 font-bold font-hanken px-4 py-2 bg-slate-100 border rounded-xs border-slate-200 cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt=""
        className="w-8 h-8 inline-flex items-center justify-center"
      />
      <div className="flex-1 flex flex-col items-start justify-center">
        <div>{product.skuTitle}</div>
        <div>{product.skuId}</div>
      </div>
      <div className="flex flex-col items-start justify-center text-slate-800">
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
  const location = useLocation();
  const nav = useNavigate();

  const subTotal =
    cart.reduce(
      (acc, item) => acc + (item.quantity * item.productId.price || 0),
      0,
    ) || 0;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className="w-[30%] bg-white px-3 py-5 flex flex-col gap-3 border rounded-md border-slate-200 shadow-2xs overflow-hidden">
      <div className="flex items-center  gap-2 text-lg font-bold text-slate-800 tracking-wider mb-4">
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
      <div className="w-full h-px border border-slate-200"></div>
      <div className="w-full flex flex-col items-start justify-between px-2 py-2 tracking-wider text-slate-600">
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
      <div className="w-full h-px border border-slate-200"></div>
      <div className="w-full flex items-start justify-between px-2 py-2 tracking-wider text-slate-600">
        <span className="flex-1 ">Total: </span>
        <span className="text-slate-800 font-black">
          <span className="text-xs font-light">USD</span> $
          {subTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="w-full h-px border border-slate-200"></div>
      <div className="w-full m-auto flex items-center justify-center">
        <button
          type="submit"
          onClick={() => nav("/checkout/payment")}
          className="bg-black text-white px-6 py-2 rounded-sm hover:scale-105 cursor-pointer"
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
