import React, { Component } from "react";

import Login from "../Header/Login/Login";
import UserMenu from "../Header/UserMenu";
import AppContextHOC from "../HOC/AppContextHOC";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a
            className="navbar-brand"
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Movie App
          </a>
          {this.props.user ? (
            <UserMenu />
          ) : (
            <Login toggleModal={this.props.toggleModal} />
          )}
        </div>
      </nav>
    );
  }
}
export default AppContextHOC(Header);
