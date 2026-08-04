/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { MdCircle } from "react-icons/md";
import { useParams, useFetcher } from "react-router-dom";
import StarRating from "./StartRating";
import api from "../../api/api";

function ProductReviews({ reviewData }) {
  const { productId } = useParams();

  const fetcher = useFetcher();

  const [reviews, setReviews] = useState(reviewData.reviews);
  const [currentPage, setCurrentPage] = useState(reviewData.currentPage);

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (fetcher.data?.success && fetcher.data?.newReview) {
      setReviews((prev) => [fetcher.data.newReview, ...prev]);
      setStar(0);
      setComment("");
    }
  }, [fetcher.data]);

  const isSubmitting = fetcher.state === "submitting";

  const fetchMoreReviews = async () => {
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await api.get(`/reviews/${productId}?page=${nextPage}`);

      setReviews((prev) => [...prev, ...response.data.reviews]);
      setCurrentPage(nextPage);
      setShowAllReviews(true);
    } catch (error) {
      console.error("Failed to load more reviews", error);
    }
    setIsLoading(false);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  return (
    <div className="flex flex-col w-full gap-4">
      <fetcher.Form
        method="post"
        className="flex flex-col items-center justify-around w-full border rounded-lg border-slate-200 p-4 bg-slate-50"
      >
        <input type="hidden" name="intent" value="add_review" />
        <input type="hidden" name="rating" value={star} />

        <div className="w-full flex flex-col items-start gap-2">
          <h4 className="font-bold text-slate-800">Write a Review</h4>

          {fetcher.data?.errorMsg && (
            <div className="text-red-500 text-sm font-semibold">
              {fetcher.data.errorMsg}
            </div>
          )}

          <StarRating rating={star} setStar={setStar} />
        </div>

        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your review about the product here..."
          className="w-full border border-slate-300 bg-white mt-3 p-3 rounded-md outline-none focus:border-blue-500 min-h-25 resize-y"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting || star === 0}
          className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-md self-end font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </fetcher.Form>

      <div className="flex flex-col items-start justify-around w-full gap-3 mt-2">
        <div className="underline font-bold text-slate-800">
          {/* Dynamically adjust total if they just added one */}
          See {Math.max(reviewData.totalReviews, reviews.length)} Reviews
        </div>

        {/* Map through the displayed reviews */}
        {displayedReviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col items-start justify-start w-full px-4 py-3 border rounded-md border-slate-200 bg-white"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <img
                  src={review.userId.profileImage}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover border border-slate-200"
                />
                <span className="font-bold">{review.userId.fullName}</span>
                <MdCircle className="text-[5px] text-slate-400" />
                <div className="flex items-center mt-0.5">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {review.updatedAt.split("T")[0]}
              </span>
            </div>
            <span className="text-sm text-slate-600 leading-relaxed">
              {review.comment}
            </span>
          </div>
        ))}

        {/* Action Buttons Container */}
        <div className="flex items-center gap-5 mt-2">
          {showAllReviews && reviews.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllReviews(false)}
              className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors underline underline-offset-4"
            >
              Show Less
            </button>
          )}

          {reviews.length < reviewData.totalReviews && (
            <button
              type="button"
              onClick={fetchMoreReviews}
              disabled={isLoading}
              className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-4 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "See More Reviews"}
            </button>
          )}

          {!showAllReviews && reviews.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllReviews(true)}
              className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-4"
            >
              Expand Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
