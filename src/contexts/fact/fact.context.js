import React, { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import FactsService from "../../services/facts.service";
import { sortByProperty } from "../../utils/utilities";
import { v4 as uuidv4 } from "uuid";

export const FactContext = createContext();
export const FactProvider = ({ children }) => {
  const [fact, setFact] = useState();
  const [factList, setFactList] = useState([]);
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const [factError, setFactError] = useState([]);

  const generateFact = useCallback(async () => {
    try {
      setFactError();
      setIsLoadingFact(true);

      const { data } = await FactsService.get();
      const currentFact = {
        id: uuidv4(),
        ...data,
      };

      setFactList(sortByProperty([currentFact, ...factList], "number"));
      setFact(currentFact);
      setIsLoadingFact(false);
    } catch (error) {
      setFactError("Something went wrong, try again later.");
    }
  }, [factList]);

  const removeFact = (id) => {
    setFactList(factList.filter((item) => item.id !== id));
  };

  return (
    <FactContext.Provider
      value={{
        fact,
        setFact,
        factList,
        generateFact,
        removeFact,
        factError,
        isLoadingFact,
      }}
    >
      {children}
    </FactContext.Provider>
  );
};

FactProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
