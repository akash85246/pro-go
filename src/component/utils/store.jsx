import { createStore } from "redux";

const initialState = {
  isReloading: false,
};

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

const store = createStore(rootReducer);

export default store;
