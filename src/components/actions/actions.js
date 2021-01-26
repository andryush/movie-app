export const actionCreatorUpdateSessionId = (payload) => {
  return {
    type: "UPDATE_SESSION_ID",
    payload,
  };
};

export const actionCreatorUpdateUser = (payload) => {
  return {
    type: "UPDATE_USER",
    payload,
  };
};

export const actionCreatorDeleteSessionId = () => {
  return {
    type: "DELETE_SESSION_ID",
  };
};

export const actionCreatorToggleModal = () => {
  return {
    type: "TOGGLE_MODAL",
  };
};

export const actionCreatorUpdateFavorites = (payload) => {
  return {
    type: "UPDATE_FAVORITES",
    payload,
  };
};

export const actionCreatorUpdateWatchList = (payload) => {
  return {
    type: "UPDATE_WATCHLIST",
    payload,
  };
};
