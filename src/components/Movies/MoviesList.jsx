import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";

import PropTypes from "prop-types";

const MoviesList = ({
  movies,
  addToFavorites,
  removeFromFavorites,
  favorites,
  session_id,
}) => {
  let favoriteIds = [];
  if (favorites.length > 0) {
    favoriteIds = favorites.map((el) => el.id);
  }

  let isFav = false;

  return (
    <div className="row">
      {movies.map((movie) => {
        if (session_id) {
          if (favoriteIds.includes(movie.id)) {
            isFav = true;
          } else {
            isFav = false;
          }
        }
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem
              item={movie}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFav={isFav}
            />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesHOC(MoviesList);
