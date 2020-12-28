import React, { Component } from "react";

import MoviesList from "../Movies/MoviesList";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import CallApi from "../../api/api";

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
      showModal: false,
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
      favorites: [],
      watchList: [],
    });
  };

  setFavorites = (favorites) => {
    this.setState({
      favorites: favorites,
    });
  };

  addToFavorites = (id) => {
    if (this.state.session_id) {
      CallApi.post("account/{account_id}/favorite", {
        params: {
          session_id: this.state.session_id,
        },
        body: {
          media_type: "movie",
          media_id: id,
          favorite: true,
        },
      })
        .then(() =>
          CallApi.get("account/{account_id}/favorite/movies", {
            params: { session_id: this.state.session_id },
          })
        )
        .then((data) => this.setFavorites(data.results));
    } else {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
      }));
    }
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
    })
      .then(() =>
        CallApi.get("account/{account_id}/favorite/movies", {
          params: { session_id: this.state.session_id },
        })
      )
      .then((data) => this.setFavorites(data.results));
  };

  setWatchList = (watchList) => {
    this.setState({
      watchList: watchList,
    });
  };

  addToWatchList = (id) => {
    if (this.state.session_id) {
      CallApi.post("account/{account_id}/watchlist", {
        params: {
          session_id: this.state.session_id,
        },
        body: {
          media_type: "movie",
          media_id: id,
          watchlist: true,
        },
      })
        .then(() =>
          CallApi.get("account/{account_id}/watchlist/movies", {
            params: {
              session_id: this.state.session_id,
            },
          })
        )
        .then((data) => this.setWatchList(data.results));
    } else {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
      }));
    }
  };

  removeFromWatchList = (id) => {
    CallApi.post("account/{account_id}/watchlist", {
      params: {
        session_id: this.state.session_id,
      },
      body: {
        media_type: "movie",
        media_id: id,
        watchlist: false,
      },
    })
      .then(() =>
        CallApi.get("account/{account_id}/watchlist/movies", {
          params: {
            session_id: this.state.session_id,
          },
        })
      )
      .then((data) => this.setWatchList(data.results));
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      this.setState({
        session_id: session_id,
      });

      CallApi.get("account", {
        params: {
          session_id: session_id,
        },
      }).then((user) => this.updateUser(user));

      CallApi.get("account/{account_id}/favorite/movies", {
        params: {
          session_id: session_id,
        },
      }).then((data) => this.setFavorites(data.results));

      CallApi.get("account/{account_id}/watchlist/movies", {
        params: {
          session_id: session_id,
        },
      }).then((data) => this.setWatchList(data.results));
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
          setFavorites: this.setFavorites,
          setWatchList: this.setWatchList,
          favorites: this.state.favorites,
          watchList: this.state.watchList,
          showModal: this.state.showModal,
        }}
      >
        <>
          <Header user={this.state.user} showModal={this.state.showModal} />
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
                  watchList={this.state.watchList}
                  setFavorites={this.setFavorites}
                  addToWatchList={this.addToWatchList}
                  removeFromWatchList={this.removeFromWatchList}
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
