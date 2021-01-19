import React from "react";
import CallApi from "../../../api/api";
class MovieDetail extends React.Component {
  state = {
    movie: [],
  };

  componentDidMount() {
    CallApi.get(`movie/${this.props.match.params.id}`, {
      params: { language: "ru-RU" },
    }).then((movie) => this.updateMovie(movie));
  }

  updateMovie = (movie) => {
    this.setState({
      movie: movie,
    });
  };

  generateBagdeList = (badgeList) => {
    if (badgeList) {
      return badgeList.map((bagde) => {
        return (
          <div key={bagde.name}>
            <span className="badge bg-primary" style={{ color: "white" }}>
              {bagde.name}
            </span>
          </div>
        );
      });
    }
  };

  render() {
    const {
      original_title,
      release_date,
      budget,
      revenue,
      runtime,
      genres,
      production_countries,
    } = this.state.movie;

    return (
      <div className="container">
        <table className="table table-hover mt-3">
          <tbody>
            <tr>
              <th scope="row">Оригинальное название</th>
              <td>{original_title}</td>
            </tr>
            <tr>
              <th scope="row">Дата релиза</th>
              <td>{release_date}</td>
            </tr>
            <tr>
              <th scope="row">Бюджет</th>
              <td>{budget}</td>
            </tr>
            <tr>
              <th scope="row">Сборы</th>
              <td>{revenue}</td>
            </tr>
            <tr>
              <th scope="row">Продолжительность</th>
              <td>{runtime} минут</td>
            </tr>
            <tr>
              <th scope="row">Жанры</th>
              <td>{this.generateBagdeList(genres)}</td>
            </tr>
            <tr>
              <th scope="row">Страны</th>
              <td>{this.generateBagdeList(production_countries)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default MovieDetail;
