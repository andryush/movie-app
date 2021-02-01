import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { UPDATE_SESSION_ID, DELETE_SESSION_ID } from "./auth/auth.types";
import { cookies } from "../utils/cookies";

const logger = (store) => (next) => (action) => {
  console.log("I'm MIDDLEWARE, BITCH");
  return next(action);
};

const updateCookies = (store) => (next) => (action) => {
  if (action.type === UPDATE_SESSION_ID) {
    cookies.set("session_id", action.payload, { path: "/", maxAge: 7200 });
  }
  if (action.type === DELETE_SESSION_ID) {
    cookies.remove("session_id");
  }
  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, updateCookies, thunk))
);
