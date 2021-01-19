import React from "react";
import CallApi from "../../../api/api";
import DefaultPoster from "../../../assets/images/poster-not-found.jpg";
class MovieCredit extends React.Component {
  state = {
    movieCredits: [],
  };

  componentDidMount() {
    CallApi.get(`movie/${this.props.match.params.id}/credits`).then((data) =>
      this.updateMovieCredits(data.cast)
    );
  }

  updateMovieCredits(movieCredits) {
    this.setState({
      movieCredits: movieCredits,
    });
  }

  render() {
    const creditsCard = this.state.movieCredits.map((el) => {
      const poster =
        el.profile_path === null
          ? DefaultPoster
          : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${el.profile_path}`;
      return (
        <div className="card mt-3" style={{ width: "18rem" }} key={el.id}>
          <img className="card-img-top" src={poster} alt={el.name} />
          <div className="card-body">
            <p className="card-text">{el.name}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="container d-flex flex-wrap justify-content-between">
        {creditsCard}
      </div>
    );
  }
}
export default MovieCredit;
