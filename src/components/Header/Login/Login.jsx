import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={this.props.toggleModal}
        >
          Вход
        </button>
      </div>
    );
  }
}
export default Login;
