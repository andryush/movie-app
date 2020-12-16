// import React, { Component } from "react";
// import { API_URL, API_KEY_V3 } from "../../api/api";

// import Genres from "./Genres";

// class GenresContainer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       genresList: [],
//     };
//   }

//   componentDidMount() {
//     const link = `${API_URL}genre/movie/list?api_key=${API_KEY_V3}&language=ru-RU`;
//     fetch(link)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           genresList: data.genres,
//         });
//       });
//   }

//   onChangeGenre = (event) => {
//     // const newSelectedGenres = [...this.props.genres];
//     // if (newSelectedGenres.indexOf(id) !== -1) {
//     //   newSelectedGenres.splice(newSelectedGenres.indexOf(id), 1);
//     // } else {
//     //   newSelectedGenres.push(id);
//     // }
//     const id = Number(event.target.id);
//     const { genres } = this.props;
//     this.props.onChangeFilters({
//       target: {
//         name: "genres",
//         value: genres.includes(id)
//           ? genres.filter((genreId) => genreId !== id)
//           : [...genres, id],
//       },
//     });
//   };

//   render() {
//     const { genresList } = this.state;
//     const { genres } = this.props;
//     return (
//       <Genres
//         genresList={genresList}
//         genres={genres}
//         onChangeGenre={this.onChangeGenre}
//       />
//     );
//   }
// }
// export default GenresContainer;
