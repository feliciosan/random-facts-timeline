import React, { useContext, Fragment } from "react";
import iconClose from "../../assets/icons/close.svg";
import iconDelete from "../../assets/icons/delete.svg";
import Presentation from "../presentation";
import { FactContext } from "../../contexts/fact";
import "./fact.component.scss";

const Fact = () => {
  const { fact, clearFact, removeFact } = useContext(FactContext);

  const getTitle = (title) => {
    const parsedTitle = title.toString();

    return `${parsedTitle.slice(0, 2)}\n${parsedTitle.slice(2)}`;
  };

  return (
    <Fragment>
      {fact ? (
        <section className="stage stage--filled">
          <div className="fact">
            <div className="fact__close">
              <img onClick={clearFact} src={iconClose} alt="Close icon" />
            </div>
            <div className="fact__content">
              <h1 className="fact__title">{getTitle(fact.number)}</h1>
              <p className="fact__text">
                {fact.date && <span>{fact.date}, </span>}
                {fact.text}
              </p>
            </div>
            <div className="fact__delete">
              <img
                onClick={() => removeFact(fact.id)}
                src={iconDelete}
                alt="Trash icon"
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="stage stage--empty">
          <Presentation
            title="Randon Year Facts"
            description={`Generate random facts,\n from radom years.`}
          />
        </section>
      )}
    </Fragment>
  );
};

Fact.displayName = "Fact";
export default Fact;
