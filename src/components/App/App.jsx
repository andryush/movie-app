import React, { Component } from "react";

import MoviesList from "../Movies/MoviesList";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import CallApi from "../../api/api";
import { API_URL, API_KEY_V3, fetchApi } from "../../api/api";

import Cookies from "universal-cookie";

export const AppContext = React.createContext();
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
      favorites: [],
      watchList: [],
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

  deleteSessionId = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      favorites: null,
    });
  };

  getFavorites = (favorites) => {
    this.setState({
      favorites: favorites,
    });
  };

  addToFavorites = (id) => {
    CallApi.post("account/{account_id}/favorite", {
      params: {
        session_id: this.state.session_id,
      },
      body: {
        media_type: "movie",
        media_id: id,
        favorite: true,
      },
    }).then(
      fetchApi(
        `${API_URL}account/{account_id}/favorite/movies?api_key=${API_KEY_V3}&session_id=${this.state.session_id}`
      ).then((data) => this.getFavorites(data.results))
    );
  };

  removeFromFavorites = (id) => {
    CallApi.post("account/{account_id}/favorite", {
      params: {
        session_id: this.state.session_id,
      },
      body: {
        media_type: "movie",
        media_id: id,
        favorite: false,
      },
    }).then(
      fetchApi(
        `${API_URL}account/{account_id}/favorite/movies?api_key=${API_KEY_V3}&session_id=${this.state.session_id}`
      ).then((data) => this.getFavorites(data.results))
    );
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      this.setState({
        session_id: session_id,
      });
      fetchApi(
        `${API_URL}account?api_key=${API_KEY_V3}&session_id=${session_id}`
      )
        .then((user) => this.updateUser(user))
        .then(
          fetchApi(
            `${API_URL}account/{account_id}/favorite/movies?api_key=${API_KEY_V3}&session_id=${session_id}`
          ).then((data) => this.getFavorites(data.results))
        );
    }
  }

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          session_id: this.state.session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          deleteSessionId: this.deleteSessionId,
          getFavorites: this.getFavorites,
          favorites: this.state.favorites,
        }}
      >
        <>
          <Header user={this.state.user} />
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
                  session_id={this.state.session_id}
                  filters={filters}
                  page={page}
                  onChangePage={this.onChangePage}
                  getTotalPages={this.getTotalPages}
                  addToFavorites={this.addToFavorites}
                  removeFromFavorites={this.removeFromFavorites}
                  favorites={this.state.favorites}
                />
              </div>
            </div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}
export default App;
