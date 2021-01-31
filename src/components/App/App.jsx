import React, { Component } from "react";
import Header from "../Header/Header";
import LoginModal from "../Header/Login/LoginModal";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateSessionId,
  updateUser,
  deleteSessionId,
  toggleModal,
  updateFavorites,
  updateWatchList,
  fetchUser,
  fetchFavorites,
  fetchWatchList,
  asyncAddRemoveFavorites,
  asyncAddRemoveWatchList,
} from "../../redux/auth/auth.actions";

export const AppContext = React.createContext();

class App extends Component {
  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      this.props.updateSessionId(session_id);
      this.props.fetchUser(session_id);
      this.props.fetchFavorites(session_id);
      this.props.fetchWatchList(session_id);
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
            asyncAddRemoveFavorites: this.props.asyncAddRemoveFavorites,
            updateFavorites: this.props.updateFavorites,
            watchList: this.props.watchList,
            asyncAddRemoveWatchList: this.props.asyncAddRemoveWatchList,
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
    user: state.auth.user,
    session_id: state.auth.session_id,
    showModal: state.auth.showModal,
    favorites: state.auth.favorites,
    watchList: state.auth.watchList,
  };
};
const mapDispatchToProps = {
  updateSessionId,
  updateUser,
  updateFavorites,
  updateWatchList,
  deleteSessionId,
  toggleModal,
  fetchUser,
  fetchFavorites,
  fetchWatchList,
  asyncAddRemoveFavorites,
  asyncAddRemoveWatchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
