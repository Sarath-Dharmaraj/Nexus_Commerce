import { MdStar } from "react-icons/md";

function StarRating({ rating = 0 }) {
  // Example: 4.5 out of 5 equals 90%
  const validRating = Number(rating);
  const fillPercentage = (validRating / 5) * 100;

  return (
    <div className="relative flex items-center w-max">
      {/* BACKGROUND LAYER: 5 Empty/Gray Stars */}
      <div className="flex items-center text-slate-200">
        {[1, 2, 3, 4, 5].map((index) => (
          <MdStar key={`bg-${index}`} size={20} />
        ))}
      </div>

      {/* FOREGROUND LAYER: 5 Gold Stars */}
      <div
        className="absolute top-0 left-0 flex items-center text-yellow-500 overflow-hidden"
        style={{ width: `${fillPercentage}%` }}
      >
        <div className="flex items-center text-yellow-500 w-max">
          {[1, 2, 3, 4, 5].map((index) => (
            <MdStar key={`fg-${index}`} size={20} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StarRating;
