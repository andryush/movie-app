import React from "react";
import CallApi from "../../../../api/api";
import DefaultPoster from "../../../../assets/images/poster-not-found.jpg";
import Spinner from "../../../Spinner/Spinner";
class MovieCredit extends React.Component {
  state = {
    movieCredits: [],
    showSpinner: false,
  };

  componentDidMount() {
    this.toggleSpinner();
    CallApi.get(`movie/${this.props.match.params.id}/credits`, {
      params: { language: "ru-RU" },
    })
      .then((data) => this.updateMovieCredits(data.cast))
      .then(() => this.toggleSpinner());
  }

  updateMovieCredits(movieCredits) {
    this.setState({
      movieCredits: movieCredits,
    });
  }

  toggleSpinner = () => {
    this.setState((prevState) => ({
      showSpinner: !prevState.showSpinner,
    }));
  };

  generatePoster(profile_path) {
    if (!profile_path) {
      return DefaultPoster;
    } else {
      return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`;
    }
  }

  render() {
    return (
      <>
        {this.state.showSpinner ? (
          <Spinner />
        ) : (
          <div className="container d-flex flex-wrap justify-content-between">
            {this.state.movieCredits.map((el) => {
              return (
                <div
                  className="card mt-3"
                  style={{ width: "18rem" }}
                  key={el.id}
                >
                  <img
                    className="card-img-top"
                    src={this.generatePoster(el.profile_path)}
                    alt={el.name}
                  />
                  <div className="card-body">
                    <p className="card-text">{el.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
export default MovieCredit;
