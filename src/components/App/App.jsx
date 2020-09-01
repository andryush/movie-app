import React, { Component } from "react";

import MoviesList from "../Movies/MoviesList";
import Filters from "../Filters/Filters";

class App extends Component {
  constructor() {
    super();
    this.state = {
      filters: {
        sort_by: "popularity.desc",
      },
      page: 1,
    };
  }

  onChangeFilters = (event) => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };

    this.setState({
      filters: newFilters,
      page: 1
    });
  };

  onChangePage = (page) => {
    this.setState({
      page: page
    })
  }

  render() {
    const { filters, page } = this.state;
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
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
          <div className="col-8 mt-4">
            <MoviesList filters={filters} page={page} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
