import React from "react";
import MoviesList from "../../Movies/MoviesList";
import Filters from "../../Filters/Filters";

class MoviesPage extends React.Component {
  constructor() {
    super();
    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: null,
        genres: [],
      },
      page: 1,
      total_pages: null,
    };
    this.state = this.initialState;
  }

  onChangeFilters = (event) => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };

    this.setState({
      filters: newFilters,
    });
  };

  onChangePage = (page) => {
    this.setState({
      page: page,
    });
  };

  getTotalPages = (total_pages) => {
    this.setState({
      total_pages,
    });
  };

  resetFilters = (event) => {
    this.setState(this.initialState);
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mt-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  onChangeFilters={this.onChangeFilters}
                  filters={filters}
                  page={page}
                  total_pages={total_pages}
                  onChangePage={this.onChangePage}
                  resetFilters={this.resetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8 mt-4">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              getTotalPages={this.getTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MoviesPage;
