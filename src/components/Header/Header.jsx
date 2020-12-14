import React, { Component } from "react";

import Login from "../Header/Login/Login";
import User from "../Header/User";

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
            <User user={this.props.user} />
          ) : (
            <Login
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            />
          )}
        </div>
      </nav>
    );
  }
}
export default Header;
