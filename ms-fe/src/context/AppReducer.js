export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        User: action.payload,
      };
    case "UN_SET_USER":
      return {
        ...state,
        User: action.payload,
      };
    case "SET_ALL_USERS":
      return {
        ...state,
        AllUsers: action.payload,
      };
    case "UN_SET_ALL_USERS":
      return {
        ...state,
        AllUsers: action.payload,
      };
    default:
      return state;
  }
};
