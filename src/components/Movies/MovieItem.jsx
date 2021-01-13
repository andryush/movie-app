import React from "react";
import FavoriteIcon from "../Movies/Icons/FavoriteIcon";
import WatchListIcon from "../Movies/Icons/WatchListIcon";
import DefaultPoster from "../../assets/images/poster-not-found.jpg";

function MovieItem(props) {
  const { vote_average, title, backdrop_path, poster_path, id } = props.item;
  const poster =
    (backdrop_path || poster_path) === null
      ? DefaultPoster
      : `https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`;
  return (
    <div className="card h-100" style={{ width: "100%" }}>
      <img className="card-img-top card-img--height" src={poster} alt={title} />
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <div className="d-flex justify-content-between">
          <div className="card-text flex-grow-1">Рейтинг: {vote_average}</div>
          <FavoriteIcon id={id} />
          <WatchListIcon id={id} />
        </div>
      </div>
    </div>
  );
}
export default MovieItem;
