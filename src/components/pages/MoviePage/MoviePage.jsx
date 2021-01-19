import React from "react";
import CallApi from "../../../api/api";
import DefaultPoster from "../../../assets/images/poster-not-found.jpg";
import FavoriteIcon from "../../Movies/Icons/FavoriteIcon";
import WatchListIcon from "../../Movies/Icons/WatchListIcon";
import Tabs from "../../Movies/Tabs";

class MoviePage extends React.Component {
  state = {
    movie: [],
  };

  componentDidMount() {
    CallApi.get(`movie/${this.props.match.params.id}`, {
      params: { language: "ru-RU" },
    }).then((movie) => this.updateMovie(movie));
  }

  updateMovie = (movie) => {
    this.setState({
      movie: movie,
    });
  };

  render() {
    const {
      poster_path,
      backdrop_path,
      title,
      overview,
      id,
    } = this.state.movie;
    const poster =
      (backdrop_path || poster_path) === null
        ? DefaultPoster
        : `https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`;
    return (
      <div className="container mt-5">
        <div className="wrapper d-flex">
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
        <div className="mt-5">
          <Tabs id={id} />
        </div>
      </div>
    );
  }
}
export default MoviePage;
