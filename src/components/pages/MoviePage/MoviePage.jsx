import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import CallApi from "../../../api/api";
import MoviePreview from "../MoviePage/MoviePreview/MoviePreview";
import MovieDetail from "../MoviePage/MovieDetail/MovieDetail";
import MovieVideo from "../MoviePage/MovieVideo/MovieVideo";
import MovieCredit from "../MoviePage/MovieCredit/MovieCredit";
import Tabs from "./Tabs";

import Spinner from "../../Spinner/Spinner";

class MoviePage extends React.Component {
  state = {
    movie: [],
    showSpinner: false,
  };

  componentDidMount() {
    this.toggleSpinner();
    CallApi.get(`movie/${this.props.match.params.id}`, {
      params: { language: "ru-RU" },
    })
      .then((movie) => this.updateMovie(movie))
      .then(() => this.toggleSpinner());
  }

  updateMovie = (movie) => {
    this.setState({
      movie: movie,
    });
  };

  toggleSpinner = () => {
    this.setState((prevState) => ({
      showSpinner: !prevState.showSpinner,
    }));
  };

  render() {
    const { id } = this.state.movie;

    return (
      <>
        <div className="container mt-5">
          {this.state.showSpinner ? (
            <Spinner />
          ) : (
            <MoviePreview movie={this.state.movie} />
          )}
          <div className="mt-5">
            <Tabs id={id} />
          </div>
          <Switch>
            <Route path="/movie/:id/details">
              <MovieDetail movie={this.state.movie} />
            </Route>
            <Route path="/movie/:id/videos" component={MovieVideo} />
            <Route path="/movie/:id/credits" component={MovieCredit} />
            <Redirect to={`/movie/${id}/details`} />
          </Switch>
        </div>
      </>
    );
  }
}
export default withRouter(MoviePage);
