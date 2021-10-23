import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./presentation.component.scss";

const Presentation = ({ title, description }) => {
  return (
    <Fragment>
      <div>
        <h1 className="presentation__title">{title}</h1>
      </div>
      <div>
        <p className="presentation__description">{description}</p>
      </div>
    </Fragment>
  );
};

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Presentation.displayName = "Presentation";
export default Presentation;
