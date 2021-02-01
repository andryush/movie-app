import * as types from "./auth.types";
import { cookies } from "../../utils/cookies";

const initialState = {
  session_id: cookies.get("session_id") || null,
  user: null,
  showModal: false,
  favorites: [],
  watchList: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SESSION_ID:
      return { ...state, session_id: action.payload };

    case types.UPDATE_USER:
      return { ...state, user: action.payload };

    case types.DELETE_SESSION_ID:
      return {
        ...state,
        session_id: null,
        user: null,
        showModal: false,
        favorites: [],
        watchList: [],
      };

    case types.TOGGLE_MODAL:
      return { ...state, showModal: !state.showModal };

    case types.UPDATE_FAVORITES:
      return { ...state, favorites: action.payload };

    case types.UPDATE_WATCHLIST:
      return { ...state, watchList: action.payload };

    default:
      return state;
  }
};
