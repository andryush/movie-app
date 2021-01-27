import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  session_id: cookies.get("session_id") || null,
  user: null,
  showModal: false,
  favorites: [],
  watchList: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SESSION_ID":
      cookies.set("session_id", action.payload, { path: "/", maxAge: 7200 });
      return { ...state, session_id: cookies.get("session_id") };

    case "UPDATE_USER":
      return { ...state, user: action.payload };

    case "DELETE_SESSION_ID":
      cookies.remove("session_id");
      return {
        ...state,
        session_id: null,
        user: null,
        showModal: false,
        favorites: [],
        watchList: [],
      };

    case "TOGGLE_MODAL":
      return { ...state, showModal: !state.showModal };

    case "UPDATE_FAVORITES":
      return { ...state, favorites: action.payload };

    case "UPDATE_WATCHLIST":
      return { ...state, watchList: action.payload };

    default:
      return state;
  }
};
