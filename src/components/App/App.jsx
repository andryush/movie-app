import React, { Component } from "react";

import MoviesList from "../Movies/MoviesList";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import LoginModal from "../Header/Login/LoginModal";
import CallApi from "../../api/api";

import Cookies from "universal-cookie";

export const AppContext = React.createContext();
const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      user: null,
      session_id: cookies.get("session_id") || null,
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

  getUser = (session_id) => {
    return CallApi.get("account", {
      params: {
        session_id: session_id,
      },
    });
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

  //// Favorites methods BEGIN ///
  // Getting favorites from server
  getFavorites = () => {
    return CallApi.get("account/{account_id}/favorite/movies", {
      params: { session_id: this.state.session_id },
    });
  };

  // Updating favorites
  updateFavorites = (favorites) => {
    this.setState({
      favorites: favorites,
    });
  };

  // Adding or removing favorites
  addRemoveFavorites = (id) => {
    if (!this.state.session_id) {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
      }));
    } else {
      const favoriteIds = this.state.favorites.map((favorite) => favorite.id);
      const isFavorite = favoriteIds.includes(id) ? false : true;
      CallApi.post("account/{account_id}/favorite", {
        params: {
          session_id: this.state.session_id,
        },
        body: {
          media_type: "movie",
          media_id: id,
          favorite: isFavorite,
        },
      })
        .then(() => this.getFavorites())
        .then((data) => this.updateFavorites(data.results));
    }
  };
  //// Favorites methods END ////

  //// WatchList methods BEGIN
  // Getting watchList from server
  getWatchList = () => {
    return CallApi.get("account/{account_id}/watchlist/movies", {
      params: {
        session_id: this.state.session_id,
      },
    });
  };

  // Updating watchList
  updateWatchList = (watchList) => {
    this.setState({
      watchList: watchList,
    });
  };

  // Adding or removing watchlist
  addRemoveWatchList = (id) => {
    if (!this.state.session_id) {
      this.setState((prevState) => ({
        showModal: !prevState.showModal,
      }));
    } else {
      const watchListIds = this.state.watchList.map(
        (watchList) => watchList.id
      );
      const isWatchListed = watchListIds.includes(id) ? false : true;
      CallApi.post("account/{account_id}/watchlist", {
        params: {
          session_id: this.state.session_id,
        },
        body: {
          media_type: "movie",
          media_id: id,
          watchlist: isWatchListed,
        },
      })
        .then(() => this.getWatchList())
        .then((data) => this.updateWatchList(data.results));
    }
  };
  //// WatchList methods END

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  componentDidMount() {
    const { session_id } = this.state;
    if (session_id) {
      this.setState({
        session_id: session_id,
      });
      this.getUser(session_id).then((user) => this.updateUser(user));
      this.getFavorites().then((favorites) =>
        this.updateFavorites(favorites.results)
      );
      this.getWatchList().then((watchList) =>
        this.updateWatchList(watchList.results)
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
          updateWatchList: this.updateWatchList,
          favorites: this.state.favorites,
          addRemoveFavorites: this.addRemoveFavorites,
          updateFavorites: this.updateFavorites,
          watchList: this.state.watchList,
          addRemoveWatchList: this.addRemoveWatchList,
          showModal: this.state.showModal,
          toggleModal: this.toggleModal,
        }}
      >
        <>
          {this.state.showModal && (
            <LoginModal
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
            />
          )}
          <Header />
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
