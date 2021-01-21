import React from "react";
import CallApi from "../../../../api/api";
import Spinner from "../../../Spinner/Spinner";

class MovieVideo extends React.Component {
  state = {
    movieVideos: [],
    showSpinner: false,
  };
  componentDidMount() {
    this.toggleSpinner();
    CallApi.get(`movie/${this.props.match.params.id}/videos`, {
      params: { language: "ru-RU" },
    })
      .then((data) => this.updateMovieVideos(data.results))
      .then(() => this.toggleSpinner());
  }
  updateMovieVideos = (movieVideos) => {
    this.setState({
      movieVideos: movieVideos,
    });
  };
  toggleSpinner = () => {
    this.setState((prevState) => ({
      showSpinner: !prevState.showSpinner,
    }));
  };
  render() {
    return (
      <>
        {this.state.showSpinner ? (
          <Spinner />
        ) : (
          <div className="container">
            {this.state.movieVideos.map((el) => {
              return (
                <div
                  key={el.id}
                  className="embed-responsive embed-responsive-16by9 mt-3 mb-3"
                >
                  <iframe
                    className="embed-responsive-item"
                    title={el.key}
                    src={`https://www.youtube.com/embed/${el.key}?rel=0`}
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
export default MovieVideo;
