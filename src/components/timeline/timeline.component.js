import React, { useEffect } from "react";
import PropTypes from "prop-types";
import iconLeft from "../../assets/icons/chevron-left.svg";
import iconRight from "../../assets/icons/chevron-right.svg";
import "./timeline.component.scss";

const directionOptions = {
  left: "LEFT",
  right: "RIGHT",
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
      case directionOptions.left:
        if (selectedFactIndex === 0) return;

        changeItem(data[selectedFactIndex - 1]);
        break;
      case directionOptions.right:
        if (selectedFactIndex === data.length - 1) return;

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
          onClick={() => handleChange(directionOptions.left)}
          className="timeline__icon"
        >
          <img src={iconLeft} alt="" />
        </div>
        <div
          onClick={() => handleChange(directionOptions.right)}
          className="timeline__icon"
        >
          <img src={iconRight} alt="" />
        </div>
      </div>
      <div className="timeline__content">
        {data.map((item) => (
          <div
            key={item.id}
            className={`timeline__item ${
              currentItem &&
              item.id === currentItem.id &&
              "timeline__item--active"
            }`}
            onClick={() => changeItem(item)}
          >
            {item.number}
          </div>
        ))}
      </div>
    </div>
  );
};

Presentation.propTypes = {
  currentItem: PropTypes.object.isRequired,
  changeItem: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

Timeline.displayName = "Timeline";
export default Timeline;
