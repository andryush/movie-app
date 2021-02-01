import React, { Component } from "react";
import Header from "../Header/Header";
import LoginModal from "../Header/Login/LoginModal";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withAuth } from "../../hoc/withAuth";

class App extends Component {
  componentDidMount() {
    const { auth, authActions } = this.props;
    if (auth.session_id) {
      authActions.updateSessionId(auth.session_id);
      authActions.fetchUser(auth.session_id);
      authActions.fetchFavorites(auth.session_id);
      authActions.fetchWatchList(auth.session_id);
    }
  }

  render() {
    const { auth, authActions } = this.props;
    return (
      <Router>
        <>
          {auth.showModal && (
            <LoginModal
              showModal={auth.showModal}
              toggleModal={authActions.toggleModal}
            />
          )}
          <Header />

          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
        </>
      </Router>
    );
  }
}
export default withAuth(App);
