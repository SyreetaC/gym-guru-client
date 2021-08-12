import CustomizedAccordions from "../../components/Accordian/Accordian";

import { FaStar, FaRegStar } from "react-icons/fa";
import "./GymPage.css";

const GymPage = ({ rating }) => {
  return (
    <div className="main-container">
      <div className="image-container">
        <img
          src="https://prod-we-cdn-media.puregym.com/media/805029/calcot-free-weights.jpg?quality=80"
          alt="pure gym"
          height="350"
          class="image"
        />
      </div>
      <div className="about-container">
        <h1 className="title">Fitness First</h1>
        <div className="info-container">
          <div>
            {(rating === 10 && (
              <div>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="rating">{rating}/10</span>
              </div>
            )) ||
              (rating >= 8 && (
                <div>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  <span className="rating">{rating}/10</span>
                </div>
              )) ||
              (rating >= 6 && (
                <div>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  <FaRegStar />
                  <span className="rating">{rating}/10</span>
                </div>
              )) ||
              (rating >= 3 && (
                <div>
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <span className="rating">{rating}/10</span>
                </div>
              )) ||
              (rating >= 1 && (
                <div>
                  <FaStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <span className="rating">{rating}/10</span>
                </div>
              )) ||
              (rating === 0 && (
                <div>
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <span className="rating">{rating}/10</span>
                </div>
              ))}
          </div>
          <div className="accordian">
            <CustomizedAccordions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymPage;