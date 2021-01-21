import React from "react";
import FavoriteIcon from "../../../Movies/Icons/FavoriteIcon";
import WatchListIcon from "../../../Movies/Icons/WatchListIcon";
import DefaultPoster from "../../../../assets/images/poster-not-found.jpg";

class MoviePreview extends React.Component {
  generatePoster = (poster_path) => {
    if (!poster_path) {
      return DefaultPoster;
    }
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  };

  render() {
    const { title, overview, poster_path, id } = this.props.movie;

    const poster = this.generatePoster(poster_path);
    return (
      <div className="d-flex">
        <div className="p-0">
          <img src={poster} alt={title} style={{ maxWidth: "300px" }} />
        </div>
        <div className="pl-5">
          <h1 className="display-5">{title}</h1>
          <p className="lead">{overview}</p>
          <hr className="my-2" />
          <FavoriteIcon id={id} />
          <WatchListIcon id={id} />
        </div>
      </div>
    );
  }
}
export default MoviePreview;
