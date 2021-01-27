export const updateSessionId = (payload) => {
  return {
    type: "UPDATE_SESSION_ID",
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: "UPDATE_USER",
    payload,
  };
};

export const deleteSessionId = () => {
  return {
    type: "DELETE_SESSION_ID",
  };
};

export const toggleModal = () => {
  return {
    type: "TOGGLE_MODAL",
  };
};

export const updateFavorites = (payload) => {
  return {
    type: "UPDATE_FAVORITES",
    payload,
  };
};

export const updateWatchList = (payload) => {
  return {
    type: "UPDATE_WATCHLIST",
    payload,
  };
};
