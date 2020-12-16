import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const Genres = ({ genresList, genres, onChangeGenre }) => {
  return (
    <div>
      <label>Жанры:</label>
      {genresList.map((genre) => {
        return (
          <div className="form-check" key={genre.id}>
            <input
              type="checkbox"
              className="form-check-input"
              name={genre.name}
              id={genre.id}
              onChange={onChangeGenre}
              checked={genres.includes(genre.id)}
            />
            <label htmlFor={genre.id}>{genre.name}</label>
          </div>
        );
      })}
    </div>
  );
};

Genres.defaultProps = {
  genres: [],
  genresList: [],
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  genresList: PropTypes.array.isRequired,
};
export default GenresHOC(Genres);
