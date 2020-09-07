import React, { Component } from "react";
import { API_URL, API_KEY_V3 } from "../../api/api";

class Genres extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      selectedGenres: [],
    };
  }

  componentDidMount() {
    const link = `${API_URL}genre/movie/list?api_key=${API_KEY_V3}&language=ru-RU`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          genres: data.genres,
        });
      });
  }

  onChangeGenre = (event) => {
    const newSelectedGenres = [...this.state.selectedGenres];
    const id = parseInt(event.target.id);
    if (newSelectedGenres.indexOf(id) !== -1) {
      newSelectedGenres.splice(newSelectedGenres.indexOf(id), 1);
    } else {
      newSelectedGenres.push(id);
    }
    this.setState(
      {
        selectedGenres: newSelectedGenres,
      },
      () => this.props.getGenres(this.state.selectedGenres)
    );
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <label>Жанры:</label>
        {genres.map((genre) => {
          return (
            <div className="form-check" key={genre.id}>
              <input
                type="checkbox"
                className="form-check-input"
                name={genre.name}
                id={genre.id}
                onChange={this.onChangeGenre}
              />
              <label htmlFor={genre.id}>{genre.name}</label>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Genres;
