// import React, { Component } from "react";
// import MoviesList from "./MoviesList";
// import { API_KEY_V3, API_URL } from "../../api/api";

// class MoviesContainer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       movies: [],
//     };
//   }

//   getMovies = (filters, page) => {
//     const { sort_by, primary_release_year, genres } = filters;
//     let genresQuery = "";
//     if (genres.length > 0) {
//       for (let i = 0; i < genres.length; i++) {
//         genresQuery += genres[i] + "%2C";
//       }
//       genresQuery = genresQuery.slice(0, -3);
//     }
//     const link = `${API_URL}discover/movie?api_key=${API_KEY_V3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genresQuery}`;
//     fetch(link)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           movies: data.results,
//         });
//         this.props.getTotalPages(data.total_pages);
//       });
//   };

//   componentDidMount() {
//     this.getMovies(this.props.filters, this.props.page);
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.filters !== prevProps.filters) {
//       this.props.onChangePage(1);
//       this.getMovies(this.props.filters, 1);
//     }

//     if (this.props.page !== prevProps.page) {
//       this.getMovies(this.props.filters, this.props.page);
//     }
//   }

//   render() {
//     const { movies } = this.state;
//     return <MoviesList movies={movies} />;
//   }
// }
// export default MoviesContainer;
