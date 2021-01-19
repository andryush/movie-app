import React from "react";
import CallApi from "../../../api/api";

class MovieVideo extends React.Component {
  state = {
    movieVideos: [],
  };
  componentDidMount() {
    CallApi.get(`movie/${this.props.match.params.id}/videos`).then((data) =>
      this.updateMovieVideos(data.results)
    );
  }
  updateMovieVideos = (movieVideos) => {
    this.setState({
      movieVideos: movieVideos,
    });
  };
  render() {
    const movieCard = this.state.movieVideos.map((el) => {
      return (
        <div
          className="embed-responsive embed-responsive-16by9 mt-3 mb-3"
          key={el.id}
        >
          <iframe
            className="embed-responsive-item"
            title={el.key}
            src={`https://www.youtube.com/embed/${el.key}?rel=0`}
            allowFullScreen
          ></iframe>
        </div>
      );
    });
    return <div className="container">{movieCard}</div>;
  }
}
export default MovieVideo;
