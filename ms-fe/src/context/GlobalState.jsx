import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const initialState = {
  User: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const SetUser = (state) => {
    dispatch({
      type: "SET_USER",
      payload: state,
    });
  };

  const UnSetUser = () => {
    dispatch({
      type: "UN_SET_USER",
      payload: null,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        User: state.User,
        SetUser: SetUser,
        UnSetUser: UnSetUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
