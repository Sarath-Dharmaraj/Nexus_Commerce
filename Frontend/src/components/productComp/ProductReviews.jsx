import { useState } from "react";
import { MdCircle } from "react-icons/md";

import StarRating from "./StartRating";

function ProductReviews({ reviewData }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [star, setStar] = useState(0);

  const displayedReviews = showAllReviews ? reviewData : reviewData.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-around w-full border rounded-lg border-slate-200">
        <StarRating rating={star} setStar={setStar} />
        <span>
          <textarea
            name="comment"
            id="comment"
            placeholder="Enter your review about the product here..."
            className="w-full border border-slate-200"
          ></textarea>
        </span>
      </div>
      <div className="flex flex-col items-start justify-around w-full gap-3">
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

        {reviewData.length > 3 && (
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start underline underline-offset-4"
          >
            {showAllReviews
              ? "Show Less"
              : `See ${reviewData.length - 3} More Reviews`}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
