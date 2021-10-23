import React, { useContext, useEffect } from "react";
import { FactContext } from "../../contexts/fact";
import "./generator.component.scss";

const Generator = () => {
  const { fact, factList, generateFact, factError, isLoadingFact } =
    useContext(FactContext);

  useEffect(() => {
    const generatorElement = document.querySelector(".generator");

    generatorElement.classList.remove(
      "generator--brown",
      "generator--white",
      "generator--light-gray"
    );

    if (fact) {
      if (factList.length % 2) {
        generatorElement.classList.add("generator--brown");
        return;
      }

      generatorElement.classList.add("generator--light-gray");
      return;
    }

    generatorElement.classList.add("generator--white");
  }, [fact, factList]);

  return (
    <section className="generator">
      <div className="generator__action">
        <button
          onClick={() => generateFact()}
          type="button"
          disabled={isLoadingFact ? "disabled" : ""}
          className={`button ${fact ? "button--white" : "button--black"}`}
        >
          Generate Random Year Fact
        </button>
        <span className="error-message">{factError}</span>
      </div>
    </section>
  );
};

Generator.displayName = "Generator";
export default Generator;
