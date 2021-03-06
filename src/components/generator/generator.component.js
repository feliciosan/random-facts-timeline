import React, { useContext, useEffect } from "react";
import Timeline from "../timeline";
import { FactContext } from "../../contexts/fact";
import "./generator.component.scss";

const Generator = () => {
  const { fact, selectFact, factList, generateFact, factError, isLoadingFact } =
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
          onClick={generateFact}
          type="button"
          disabled={isLoadingFact ? "disabled" : ""}
          className={`button ${fact ? "button--white" : "button--black"}`}
        >
          Generate Random Year Fact
        </button>
        <span className="error-message">{factError}</span>
      </div>
      <Timeline currentItem={fact} changeItem={selectFact} data={factList} />
    </section>
  );
};

Generator.displayName = "Generator";
export default Generator;
