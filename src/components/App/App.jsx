import React, { Component } from "react";

import MoviesList from "../Movies/MoviesList";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import { API_URL, API_KEY_V3, fetchApi } from "../../api/api";

import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      user: null,
      session_id: null,
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

  updateUser = (user) => {
    this.setState({
      user: user,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 7200,
    });

    this.setState({
      session_id: session_id,
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}account?api_key=${API_KEY_V3}&session_id=${session_id}`
      ).then((user) => this.updateUser(user));
    }
  }

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <>
        <Header
          updateUser={this.updateUser}
          user={this.state.user}
          updateSessionId={this.updateSessionId}
        />
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
                    getGenres={this.getGenres}
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
      </>
    );
  }
}
export default App;
