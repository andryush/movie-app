import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";

import { Star, StarBorder } from "@material-ui/icons";

function FavoriteIcon({ id, favorites, addRemoveFavorites }) {
  let isFavorite = false;
  if (favorites.length > 0) {
    let favoriteIDs = favorites.map((el) => el.id);
    isFavorite = favoriteIDs.includes(id) ? true : false;
  }
  return (
    <>
      {isFavorite ? (
        <Star onClick={() => addRemoveFavorites(id)} />
      ) : (
        <StarBorder onClick={() => addRemoveFavorites(id)} />
      )}
    </>
  );
}
export default AppContextHOC(FavoriteIcon);
