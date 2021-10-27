import React, { useEffect } from "react";
import PropTypes from "prop-types";
import iconLeft from "../../assets/icons/chevron-left.svg";
import iconRight from "../../assets/icons/chevron-right.svg";
import "./timeline.component.scss";

const directionOptions = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const Timeline = ({ currentItem, changeItem, data }) => {
  const handleChange = (direction) => {
    if (!data.length) return;

    let selectedFactIndex = data.indexOf(currentItem);

    if (selectedFactIndex === -1) {
      changeItem(data[0]);
      return;
    }

    switch (direction) {
      case directionOptions.LEFT:
        if (selectedFactIndex === 0) break;

        changeItem(data[selectedFactIndex - 1]);
        break;
      case directionOptions.RIGHT:
        if (selectedFactIndex === data.length - 1) break;

        changeItem(data[selectedFactIndex + 1]);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (currentItem) {
      const element = document.querySelector(".timeline__item--active");

      element &&
        element.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [currentItem, data]);

  return (
    <div className="timeline">
      <div className="timeline__actions">
        <div
          onClick={() => handleChange(directionOptions.LEFT)}
          className="timeline__icon"
        >
          <img src={iconLeft} alt="" />
        </div>
        <div
          onClick={() => handleChange(directionOptions.RIGHT)}
          className="timeline__icon"
        >
          <img src={iconRight} alt="" />
        </div>
      </div>
      <div className="timeline__content">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => changeItem(item)}
            className={`timeline__item ${
              currentItem &&
              item.id === currentItem.id &&
              "timeline__item--active"
            }`}
          >
            {item.number}
          </div>
        ))}
      </div>
    </div>
  );
};

Timeline.propTypes = {
  currentItem: PropTypes.object,
  changeItem: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

Timeline.displayName = "Timeline";
export default Timeline;
