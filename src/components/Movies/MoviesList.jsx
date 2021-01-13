import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";

import PropTypes from "prop-types";

const MoviesList = ({
  movies,
  favorites,
  watchList,
  addRemoveFavorites,
  addRemoveWatchList,
}) => {
  let isFavorite = false;
  let isWatchListed = false;
  return (
    <div className="row">
      {movies.map((movie) => {
        if (favorites) {
          let favoriteIds = favorites.map((el) => el.id);
          favoriteIds.includes(movie.id)
            ? (isFavorite = true)
            : (isFavorite = false);
        }
        if (watchList) {
          let watchListIds = watchList.map((el) => el.id);
          watchListIds.includes(movie.id)
            ? (isWatchListed = true)
            : (isWatchListed = false);
        }
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem
              item={movie}
              isFavorite={isFavorite}
              isWatchListed={isWatchListed}
              addRemoveFavorites={addRemoveFavorites}
              addRemoveWatchList={addRemoveWatchList}
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
