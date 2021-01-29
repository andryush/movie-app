import React from "react";
import { AppContextHOC } from "../../HOC/AppContextHOC";

import { Star, StarBorder } from "@material-ui/icons";

function FavoriteIcon({ id, favorites, asyncAddRemoveFavorites }) {
  let isFavorite = false;
  if (favorites.length > 0) {
    let favoriteIDs = favorites.map((el) => el.id);
    isFavorite = favoriteIDs.includes(id) ? true : false;
  }
  return (
    <>
      {isFavorite ? (
        <Star onClick={() => asyncAddRemoveFavorites(id)} />
      ) : (
        <StarBorder onClick={() => asyncAddRemoveFavorites(id)} />
      )}
    </>
  );
}
export default AppContextHOC(FavoriteIcon);
