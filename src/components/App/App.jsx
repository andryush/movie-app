import React, { Component } from "react";
import Header from "../Header/Header";
import LoginModal from "../Header/Login/LoginModal";
import CallApi from "../../api/api";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Cookies from "universal-cookie";
import { connect } from "react-redux";
import {
  actionCreatorUpdateSessionId,
  actionCreatorUpdateUser,
  actionCreatorDeleteSessionId,
  actionCreatorToggleModal,
  actionCreatorUpdateFavorites,
  actionCreatorUpdateWatchList,
} from "../actions/actions";

export const AppContext = React.createContext();
//const cookies = new Cookies();

class App extends Component {
  // state = {
  //   user: null,
  //   session_id: cookies.get("session_id") || null,
  //   favorites: [],
  //   watchList: [],
  //   showModal: false,
  // };

  getUser = (session_id) => {
    return CallApi.get("account", {
      params: {
        session_id: session_id,
      },
    });
  };

  // updateUser = (user) => {
  //   this.setState({
  //     user: user,
  //   });
  // };

  // updateSessionId = (session_id) => {
  //   cookies.set("session_id", session_id, {
  //     path: "/",
  //     maxAge: 7200,
  //   });

  //   this.setState({
  //     session_id: session_id,
  //   });
  // };

  // deleteSessionId = () => {
  //   cookies.remove("session_id");
  //   this.setState({
  //     session_id: null,
  //     user: null,
  //     favorites: [],
  //     watchList: [],
  //   });
  // };

  //// Favorites methods BEGIN ///
  // Getting favorites from server
  getFavorites = () => {
    return CallApi.get("account/{account_id}/favorite/movies", {
      params: { session_id: this.props.session_id },
    });
  };

  // Updating favorites
  // updateFavorites = (favorites) => {
  //   this.setState({
  //     favorites: favorites,
  //   });
  // };

  // Adding or removing favorites
  addRemoveFavorites = (id) => {
    if (!this.props.session_id) {
      this.props.toggleModal();
    } else {
      const favoriteIds = this.props.favorites.map((favorite) => favorite.id);
      const isFavorite = favoriteIds.includes(id) ? false : true;
      CallApi.post("account/{account_id}/favorite", {
        params: {
          session_id: this.props.session_id,
        },
        body: {
          media_type: "movie",
          media_id: id,
          favorite: isFavorite,
        },
      })
        .then(() => this.getFavorites())
        .then((data) => this.props.updateFavorites(data.results));
    }
  };
  //// Favorites methods END ////

  //// WatchList methods BEGIN
  // Getting watchList from server
  getWatchList = () => {
    return CallApi.get("account/{account_id}/watchlist/movies", {
      params: {
        session_id: this.props.session_id,
      },
    });
  };

  // Updating watchList
  // updateWatchList = (watchList) => {
  //   this.setState({
  //     watchList: watchList,
  //   });
  // };

  // Adding or removing watchlist
  addRemoveWatchList = (id) => {
    if (!this.props.session_id) {
      this.props.toggleModal();
    } else {
      const watchListIds = this.props.watchList.map(
        (watchList) => watchList.id
      );
      const isWatchListed = watchListIds.includes(id) ? false : true;
      CallApi.post("account/{account_id}/watchlist", {
        params: {
          session_id: this.props.session_id,
        },
        body: {
          media_type: "movie",
          media_id: id,
          watchlist: isWatchListed,
        },
      })
        .then(() => this.getWatchList())
        .then((data) => this.props.updateWatchList(data.results));
    }
  };
  //// WatchList methods END

  // toggleModal = () => {
  //   this.setState((prevState) => ({
  //     showModal: !prevState.showModal,
  //   }));
  // };

  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      // this.setState({
      //   session_id: session_id,
      // });
      this.props.updateSessionId(session_id);
      this.getUser(session_id).then((user) => this.props.updateUser(user));
      this.getFavorites().then((favorites) =>
        this.props.updateFavorites(favorites.results)
      );
      this.getWatchList().then((watchList) =>
        this.props.updateWatchList(watchList.results)
      );
    }
  }

  render() {
    return (
      <Router>
        <AppContext.Provider
          value={{
            user: this.props.user,
            session_id: this.props.session_id,
            updateUser: this.props.updateUser,
            updateSessionId: this.props.updateSessionId,
            deleteSessionId: this.props.deleteSessionId,
            updateWatchList: this.props.updateWatchList,
            favorites: this.props.favorites,
            addRemoveFavorites: this.addRemoveFavorites,
            updateFavorites: this.props.updateFavorites,
            watchList: this.props.watchList,
            addRemoveWatchList: this.addRemoveWatchList,
            showModal: this.props.showModal,
            toggleModal: this.props.toggleModal,
          }}
        >
          <>
            {this.props.showModal && (
              <LoginModal
                showModal={this.props.showModal}
                toggleModal={this.props.toggleModal}
              />
            )}
            <Header />

            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </>
        </AppContext.Provider>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    session_id: state.session_id,
    showModal: state.showModal,
    favorites: state.favorites,
    watchList: state.watchList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSessionId: (session_id) =>
      dispatch(actionCreatorUpdateSessionId(session_id)),
    updateUser: (user) => dispatch(actionCreatorUpdateUser(user)),
    deleteSessionId: () => dispatch(actionCreatorDeleteSessionId()),
    toggleModal: () => dispatch(actionCreatorToggleModal()),
    updateFavorites: (favorites) =>
      dispatch(actionCreatorUpdateFavorites(favorites)),
    updateWatchList: (watchList) =>
      dispatch(actionCreatorUpdateWatchList(watchList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
