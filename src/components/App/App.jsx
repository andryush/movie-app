import React, { Component } from "react";
import Header from "../Header/Header";
import LoginModal from "../Header/Login/LoginModal";
import CallApi from "../../api/api";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import MovieDetail from "../pages/MovieDetail/MovieDetails";
import MovieVideo from "../pages/MovieVideo/MovieVideo";
import MovieCredit from "../pages/MovieCredit/MovieCredit";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "universal-cookie";

export const AppContext = React.createContext();
const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      session_id: cookies.get("session_id") || null,
      favorites: [],
      watchList: [],
      showModal: false,
    };
  }

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
    return (
      <Router>
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

            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/movie/:id/details" component={MovieDetail} />
            <Route path="/movie/:id/videos" component={MovieVideo} />
            <Route path="/movie/:id/credits" component={MovieCredit} />
          </>
        </AppContext.Provider>
      </Router>
    );
  }
}
export default App;
