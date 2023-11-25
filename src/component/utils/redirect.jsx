// Import necessary libraries
import { createStore } from "redux";

// Define initial state
const initialState = {
  isReloading: false,
};

// Define the root reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RELOADING":
      return {
        ...state,
        isReloading: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
