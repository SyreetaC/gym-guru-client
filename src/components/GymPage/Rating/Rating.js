import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  return (
    <div>
      {(rating === 5 && (
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <span className="rating">{rating}</span>
        </div>
      )) ||
        (rating >= 4 && (
          <div>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <span className="rating">{rating}</span>
          </div>
        )) ||
        (rating >= 3 && (
          <div>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <span className="rating">{rating}</span>
          </div>
        )) ||
        (rating >= 2 && (
          <div>
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <span className="rating">{rating}</span>
          </div>
        )) ||
        (rating >= 1 && (
          <div>
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <span className="rating">{rating}</span>
          </div>
        )) ||
        (rating === 0 && (
          <div>
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <span className="rating">{rating}</span>
          </div>
        ))}
    </div>
  );
};

export default Rating;