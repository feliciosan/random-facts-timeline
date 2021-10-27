import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import FactsService from "../../services/facts.service";
import { sortByProperty } from "../../utils/utilities";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  fact: null,
  factList: [],
  isLoading: false,
  factError: null,
};

const actions = {
  GENERATE_FACT: "GENERATE_FACT",
  SET_FACT: "SET_FACT",
  SET_ERROR: "SET_ERROR",
  REMOVE_FACT: "REMOVE_FACT",
  CLEAR_FACT: "CLEAR_FACT",
  SELECT_FACT: "SELECT_FACT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.GENERATE_FACT:
      return {
        ...state,
        isLoading: true,
        factError: "",
      };
    case actions.SET_FACT:
      return {
        ...state,
        fact: action.value,
        factList: sortByProperty([action.value, ...state.factList], "number"),
        isLoading: false,
      };
    case actions.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        factError: action.value,
      };
    case actions.REMOVE_FACT:
      return {
        ...state,
        fact: null,
        factList: state.factList.filter((item) => item.id !== action.value),
      };
    case actions.CLEAR_FACT:
      return {
        ...state,
        fact: null,
      };
    case actions.SELECT_FACT:
      return {
        ...state,
        fact: action.value,
      };
    default:
      return state;
  }
};

export const FactContext = createContext();
export const FactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generateFact = async () => {
    dispatch({ type: actions.GENERATE_FACT });

    try {
      const { data } = await FactsService.get();
      const newFact = {
        ...data,
        id: uuidv4(),
        number: data.number || 0,
      };

      dispatch({
        type: actions.SET_FACT,
        value: newFact,
      });
    } catch (error) {
      dispatch({
        type: actions.SET_ERROR,
        value: "Something went wrong, try again later.",
      });
    }
  };

  const removeFact = (id) => {
    dispatch({
      type: actions.REMOVE_FACT,
      value: id,
    });
  };

  return (
    <FactContext.Provider
      value={{
        fact: state.fact,
        factList: state.factList,
        factError: state.factError,
        isLoading: state.isLoading,
        clearFact: () => dispatch({ type: actions.CLEAR_FACT }),
        selectFact: (value) => dispatch({ type: actions.SELECT_FACT, value }),
        generateFact,
        removeFact,
      }}
    >
      {children}
    </FactContext.Provider>
  );
};

FactProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
