import React from "react";
import CallApi from "../../api/api";

export default (Component) =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        movies: [],
        favorites: [],
        watchList: [],
      };
    }

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, genres } = filters;

      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
      };

      if (genres.length > 0) {
        queryStringParams.with_genres = genres.join(",");
      }

      CallApi.get("discover/movie", {
        params: queryStringParams,
      }).then((data) => {
        this.setState({
          movies: data.results,
        });
        this.props.getTotalPages(data.total_pages);
      });
    };

    updateFavorites = () => {
      if (this.props.favorites) {
        this.setState({
          favorites: this.props.favorites,
        });
      }
    };

    updateWatchList = () => {
      if (this.props.watchList) {
        this.setState({
          watchList: this.props.watchList,
        });
      }
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
      if (this.props.filters !== prevProps.filters) {
        this.props.onChangePage(1);
        this.getMovies(this.props.filters, 1);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
      }

      if (this.props.favorites !== prevProps.favorites) {
        this.updateFavorites();
      }

      if (this.props.watchList !== prevProps.watchList) {
        this.updateWatchList();
      }
    }

    render() {
      const { movies, favorites, watchList } = this.state;
      return (
        <Component
          movies={movies}
          favorites={favorites}
          watchList={watchList}
          session_id={this.props.session_id}
          addRemoveFavorites={this.props.addRemoveFavorites}
          addRemoveWatchList={this.props.addRemoveWatchList}
        />
      );
    }
  };
