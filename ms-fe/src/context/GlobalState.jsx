import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const initialState = {
  User: null,
  AllUsers: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const SetAllUsers = (state) => {
    dispatch({
      type: "SET_ALL_USERS",
      payload: state,
    });
  };
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
  const UnSetAllUsers = () => {
    dispatch({
      type: "UN_SET_ALL_USERS",
      payload: null,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        User: state.User,
        AllUsers: state.AllUsers,
        SetUser: SetUser,
        UnSetUser: UnSetUser,
        SetAllUsers: SetAllUsers,
        UnSetAllUsers: UnSetAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
