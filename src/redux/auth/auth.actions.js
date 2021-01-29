import CallApi from "../../api/api";
import * as types from "./auth.types";
//import { store } from "./../store";

export const updateSessionId = (payload) => {
  return {
    type: types.UPDATE_SESSION_ID,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: types.UPDATE_USER,
    payload,
  };
};

export const deleteSessionId = () => {
  return {
    type: types.DELETE_SESSION_ID,
  };
};

export const toggleModal = () => {
  return {
    type: types.TOGGLE_MODAL,
  };
};

export const updateFavorites = (payload) => {
  return {
    type: types.UPDATE_FAVORITES,
    payload,
  };
};

export const updateWatchList = (payload) => {
  return {
    type: types.UPDATE_WATCHLIST,
    payload,
  };
};

// Async fetch user
export const fetchUser = (session_id) => (dispatch) => {
  CallApi.get("account", {
    params: {
      session_id: session_id,
    },
  }).then((user) => {
    dispatch(updateUser(user));
  });
};

// Async fetch favorites
export const fetchFavorites = (session_id) => (dispatch) => {
  CallApi.get("account/{account_id}/favorite/movies", {
    params: { session_id: session_id },
  }).then((favorites) => {
    dispatch(updateFavorites(favorites.results));
  });
};

// Async fetch watchList
export const fetchWatchList = (session_id) => (dispatch) => {
  CallApi.get("account/{account_id}/watchlist/movies", {
    params: {
      session_id: session_id,
    },
  }).then((watchList) => {
    dispatch(updateWatchList(watchList.results));
  });
};

// Async AddRemoveFavorites
export const asyncAddRemoveFavorites = (id) => (dispatch, getState) => {
  const {
    auth: { session_id, favorites },
  } = getState();

  if (!session_id) {
    dispatch(toggleModal());
  } else {
    const favoriteIds = favorites.map((favorite) => favorite.id);
    const isFavorite = favoriteIds.includes(id) ? false : true;
    CallApi.post("account/{account_id}/favorite", {
      params: {
        session_id: session_id,
      },
      body: {
        media_type: "movie",
        media_id: id,
        favorite: isFavorite,
      },
    }).then(() => dispatch(fetchFavorites(session_id)));
  }
};

// Async AddRemoveWatchList
export const asyncAddRemoveWatchList = (id) => (dispatch, getState) => {
  const {
    auth: { session_id, watchList },
  } = getState();
  if (!session_id) {
    dispatch(toggleModal());
  } else {
    const watchListIds = watchList.map((watchList) => watchList.id);
    const isWatchListed = watchListIds.includes(id) ? false : true;
    CallApi.post("account/{account_id}/watchlist", {
      params: {
        session_id: session_id,
      },
      body: {
        media_type: "movie",
        media_id: id,
        watchlist: isWatchListed,
      },
    }).then(() => dispatch(fetchWatchList(session_id)));
  }
};
