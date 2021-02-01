import React from "react";

import { Star, StarBorder } from "@material-ui/icons";
import { withAuth } from "../../../hoc/withAuth";

function FavoriteIcon({
  auth: { favorites },
  authActions: { toggleFavoriteMovies },
  id,
}) {
  let isFavorite = false;
  if (favorites.length > 0) {
    let favoriteIDs = favorites.map((el) => el.id);
    isFavorite = favoriteIDs.includes(id) ? true : false;
  }
  return (
    <>
      {isFavorite ? (
        <Star onClick={() => toggleFavoriteMovies(id)} />
      ) : (
        <StarBorder onClick={() => toggleFavoriteMovies(id)} />
      )}
    </>
  );
}
export default withAuth(FavoriteIcon);
