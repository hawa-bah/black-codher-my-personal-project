import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer, // A reducing function that returns the next state tree
  initialState,
  compose(
    applyMiddleware(...middleware), // The store enhancer. May optionally specify it to enhance the store with third-party capabilities such as middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
export default store;
