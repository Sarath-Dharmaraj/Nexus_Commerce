/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";

import {
  MdFavorite,
  MdShoppingCartCheckout,
  MdOutlineLocalShipping,
  MdLock,
  MdOutlineShield,
  MdOutlineAssignmentReturn,
} from "react-icons/md";

import StarRating from "../components/productComp/StartRating";
import Footer from "../components/protectedPageComp/Footer";
import ProductReviews from "../components/productComp/ProductReviews";

function ProductCard() {
  const nav = useNavigate();
  const fetcher = useFetcher();
  const { productData, reviewData, wishlist, cartQuantity } = useLoaderData();
  const [imageWindow, setimageWindow] = useState();
  const [quantity, setQuantity] = useState(cartQuantity);

  useEffect(() => {
    if (productData?.imageUrl) {
      setimageWindow(productData.imageUrl);
    }
  }, [productData]);

  // quantity value updation function
  function handleInputChange(value, e) {
    switch (value) {
      case "INCREMENT": {
        if (quantity < productData.stockLevel) setQuantity((prev) => prev + 1);
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
          if (val > productData.stockLevel) {
            setQuantity(productData.stockLevel);
          } else {
            setQuantity(val);
          }
        }
        break;
      }

      default:
        break;
    }
  }

  const storePolicies = [
    {
      icon: MdOutlineLocalShipping,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: MdOutlineAssignmentReturn,
      title: "30-Day Returns",
      description: "Hassle-free process",
    },
    {
      icon: MdOutlineShield,
      title: "2 Year Warranty",
      description: "Manufacturer guarantee",
    },
    {
      icon: MdLock,
      title: "Secure Checkout",
      description: "Encrypted processing",
    },
  ];

  function setImageOnClick(url) {
    setimageWindow(url);
  }

  return (
    <div className="bg-white w-full min-h-screen flex flex-col font-hanken tracking-tight text-slate-600">
      <div className="w-full flex-1 px-4 md:px-8 pt-6 pb-12 flex flex-col items-start justify-start gap-5">
        {/* navigator */}
        <div className="flex flex-wrap items-center justify-start gap-2 md:gap-4 capitalize text-slate-800 tracking-wider text-xs md:text-base">
          <span
            className="hover:font-black hover:underline cursor-pointer transition-all"
            onClick={() => nav("/home")}
          >
            Home
          </span>
          <span>{">"}</span>
          <span className="hover:font-black hover:underline cursor-pointer transition-all">
            {productData?.category || "Electronics"}
          </span>
          <span>{">"}</span>
          <span className="font-black cursor-pointer text-slate-900">
            {productData?.skuTitle || "Product Name"}
          </span>
        </div>

        {/* Product info section */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-4 py-4">
          <div className="order-2 lg:order-1 w-full lg:w-[20%] lg:max-h-150 flex flex-row lg:flex-col items-center justify-start gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-none pb-2 lg:pb-0">
            <img
              src={productData?.imageUrl}
              alt="Main Thumbnail"
              className={`w-20 lg:w-[70%] shrink-0 cursor-pointer border-2 transition-colors rounded-sm ${imageWindow === productData?.imageUrl ? "border-blue-500" : "border-transparent hover:border-slate-300"}`}
              onClick={() => setImageOnClick(productData?.imageUrl)}
            />
            {productData?.additionalImages?.map((image, key) => (
              <img
                key={key}
                src={image}
                alt={`Thumbnail ${key}`}
                className={`w-20 lg:w-[70%] shrink-0 cursor-pointer border-2 transition-colors rounded-sm ${imageWindow === image ? "border-blue-500" : "border-transparent hover:border-slate-300"}`}
                onClick={() => setImageOnClick(image)}
              />
            ))}
          </div>

          {/* MIDDLE: 50% Main Image Column */}
          <div className="order-1 lg:order-2 w-full lg:w-[50%] flex items-start justify-center">
            <img
              src={imageWindow}
              alt="Main Product View"
              className="w-full max-w-md lg:max-w-none object-contain max-h-96 lg:max-h-150"
            />
          </div>

          <div className="order-3 w-full lg:w-[30%] flex flex-col items-start justify-start gap-6 h-full">
            <div className="flex flex-col items-start justify-start gap-2">
              <h3 className="text-2xl lg:text-3xl font-black text-slate-800 leading-tight">
                {productData?.skuTitle}
              </h3>
              <span className="tracking-tighter text-xs lg:text-sm text-slate-500 line-clamp-3">
                {productData?.description}
              </span>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-1">
              <span className="text-sm text-slate-400 font-bold line-through tracking-widest">
                $
                {Number(productData?.mrp || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                <div className="flex items-center justify-start lg:justify-between gap-4 lg:gap-0">
                  <span className="text-3xl text-slate-900 font-black tracking-widest">
                    $
                    {Number(productData?.price || 0).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="self-end text-blue-500 text-xs pl-2">
                    saved $
                    {Number(
                      (productData?.mrp || 0) - (productData?.price || 0),
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {"  "}(
                    {
                      ~~(
                        (((productData?.mrp || 0) - (productData?.price || 0)) /
                          (productData?.mrp || 1)) *
                        100
                      )
                    }
                    %)
                  </span>
                </div>
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-around w-full lg:w-auto">
                  <div className="flex items-center gap-1">
                    <StarRating rating={productData?.averageRating} />
                    <span className="font-bold text-slate-700">
                      {productData?.averageRating || "0.0"}
                    </span>
                  </div>
                  <span className="text-xs underline mt-1 lg:mt-0">
                    <span className="text-slate-800 font-black">
                      {productData?.totalReviews || 0}
                    </span>{" "}
                    reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-3 mt-2 lg:mt-0">
              <span className="text-xs font-bold tracking-tight text-green-600 uppercase">
                In Stock & ready to ship
              </span>
              <fetcher.Form
                method="put"
                className="flex flex-col md:flex-row items-center justify-between gap-3 w-full"
              >
                <input type="hidden" name="intent" value="add_cart" />
                <div className="w-full md:w-[40%] flex items-center justify-between border rounded-sm border-slate-300 font-bold text-slate-700 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleInputChange("DECREMENT")}
                    className="w-10 py-3 md:py-2 hover:bg-slate-100 hover:text-black transition-colors flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleInputChange("INPUT", e)}
                    onBlur={() => {
                      if (quantity === "" || quantity < 1) {
                        setQuantity(1);
                      }
                    }}
                    className="w-full text-center bg-transparent focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange("INCREMENT")}
                    className="w-10 py-3 md:py-2 hover:bg-slate-100 hover:text-black transition-colors flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1 w-full md:w-[60%] px-4 py-3 md:py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold rounded-sm uppercase tracking-wider text-sm"
                >
                  <MdShoppingCartCheckout />
                  <span> Add to Cart </span>
                </button>
              </fetcher.Form>
              <fetcher.Form method="post" className="w-full">
                <input type="hidden" name="intent" value="toggle_wishlist" />
                <input
                  type="hidden"
                  name="actionType"
                  value={wishlist ? "remove" : "add"}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1 w-full py-3 md:py-2 border border-slate-300 hover:bg-slate-50 transition-colors rounded-sm font-bold text-sm tracking-wider uppercase text-slate-600"
                >
                  <MdFavorite
                    className={`text-lg ${wishlist ? "text-pink-500" : ""}`}
                  />
                  <span>Add to wishlist</span>
                </button>
              </fetcher.Form>
            </div>

            <div className="w-full mt-auto flex flex-col gap-4 pb-2">
              <div className="h-px w-full bg-slate-200 mt-4 lg:mt-0"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 w-full gap-y-4 gap-x-2 text-xs font-bold tracking-tighter text-slate-400 whitespace-nowrap">
                {storePolicies.map((item, key) => (
                  <div
                    key={key}
                    className="flex items-center justify-start gap-3 sm:gap-1"
                  >
                    <item.icon className="text-xl text-blue-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-slate-800">{item.title}</span>
                      <span className="whitespace-normal sm:whitespace-nowrap">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ProductReviews reviewData={reviewData} />
      </div>
      <Footer />
    </div>
  );
}

export default ProductCard;
