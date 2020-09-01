import React, { Component } from "react";

import { API_KEY_V3, API_URL } from "../../api/api";
import MovieItem from "./MovieItem";

class MoviesList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  getMovies = (filters, page) => {
    const {sort_by} = filters;
    const link = `${API_URL}discover/movie?api_key=${API_KEY_V3}&language=ru-RU&sort_by=${sort_by}&page=${page}`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.results,
        });
      });
  }

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
      if(this.props.filters !== prevProps.filters) {
          this.getMovies(this.props.filters, this.props.page);
      }

      if(this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page)
      }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
export default MoviesList;
