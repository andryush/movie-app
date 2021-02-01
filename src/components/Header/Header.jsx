import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../hoc/withAuth";

import Login from "../Header/Login/Login";
import UserMenu from "../Header/UserMenu";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            href="https://www.themoviedb.org/"
            rel="noopener noreferrer"
          >
            Movie App
          </Link>
          {this.props.auth.user ? (
            <UserMenu />
          ) : (
            <Login toggleModal={this.props.authActions.toggleModal} />
          )}
        </div>
      </nav>
    );
  }
}
export default withAuth(Header);
