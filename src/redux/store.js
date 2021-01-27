import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";

const logger = (store) => (next) => (action) => {
  console.log("I'am MIDDLEWARE, BITCH");
  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);
