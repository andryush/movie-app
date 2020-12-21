import React, { Component } from "react";
// import { API_URL, API_KEY_V3, fetchApi } from "../../../api/api";
import CallApi from "../../../api/api";

// import { AppContext } from "../../App/App";
import AppContextHOC from "../../HOC/AppContextHOC";
import "./LoginForm.css";

import classNames from "classnames";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      submitting: false,
      errors: {},
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null,
      },
    }));
  };

  handleBlur = (event) => {
    const errors = this.validateErrors();
    const { name } = event.target;
    const error = errors[name];

    if (error) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: error,
        },
      }));
    }
  };

  validateErrors = () => {
    const errors = {};
    if (this.state.username === "") {
      errors.username = "Поле не должно быть пустым";
    }
    if (this.state.password === "") {
      errors.password = "Поле не должно быть пустым";
    }
    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Пароли не совпадают";
    }
    return errors;
  };

  onSubmit = async () => {
    try {
      // const data = await fetchApi(
      //   `${API_URL}authentication/token/new?api_key=${API_KEY_V3}`
      const data = await CallApi.get("authentication/token/new");

      // const requestToken = await fetchApi(
      //   `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY_V3}`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       username: this.state.username,
      //       password: this.state.password,
      //       request_token: data.request_token,
      //     }),
      //   }
      // );

      const requestToken = await CallApi.post(
        "authentication/token/validate_with_login",
        {
          params: {},
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          },
        }
      );

      // const { session_id } = await fetchApi(
      //   `${API_URL}authentication/session/new?api_key=${API_KEY_V3}`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       request_token: requestToken.request_token,
      //     }),
      //   }
      // );
      const { session_id } = await CallApi.post("authentication/session/new", {
        body: {
          request_token: requestToken.request_token,
        },
      });
      this.props.updateSessionId(session_id);

      // const accountDetails = await fetchApi(
      //   `${API_URL}account?api_key=${API_KEY_V3}&session_id=${session_id}`
      // );

      const accountDetails = await CallApi.get("account", {
        params: { session_id: session_id },
      });

      this.props.updateUser(accountDetails);
    } catch (error) {
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message,
        },
      });
    }
  };

  onLogin = (event) => {
    event.preventDefault();

    const errors = this.validateErrors();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.setState({
        submitting: true,
      });
      this.onSubmit();
    }
  };

  render() {
    const errorBorder = classNames({
      "form-control": !this.state.errors.username,
      "form-control error": this.state.errors.username,
    });
    return (
      <form>
        <div className="form-group">
          <label htmlFor="login">Имя пользователя</label>
          <input
            type="text"
            className={errorBorder}
            placeholder="Введите имя пользователя"
            id="username"
            name="username"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {this.state.errors.username ? (
            <div className="alert alert-danger mt-1" role="alert">
              {this.state.errors.username}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            placeholder="Введите пароль"
            id="password"
            name="password"
            onChange={this.handleChange}
          />
          {this.state.errors.password ? (
            <div className="alert alert-danger mt-1" role="alert">
              {this.state.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label htmlFor="repeatPassword">Повторие пароль</label>
          <input
            type="password"
            className="form-control"
            placeholder="Повторие пароль"
            id="repeatPassword"
            name="repeatPassword"
            onChange={this.handleChange}
          />
          {this.state.errors.repeatPassword ? (
            <div className="alert alert-danger mt-1" role="alert">
              {this.state.errors.repeatPassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={this.state.submitting}
          onClick={this.onLogin}
        >
          Войти
        </button>
        {this.state.errors.base ? (
          <div className="alert alert-danger mt-1 text-center" role="alert">
            {this.state.errors.base}
          </div>
        ) : (
          ""
        )}
      </form>
    );
  }
}
export default AppContextHOC(LoginForm);
// export default (props) => {
//   return (
//     <AppContext.Consumer>
//       {(context) => (
//         <LoginForm
//           updateUser={context.updateUser}
//           updateSessionId={context.updateSessionId}
//           {...props}
//         />
//       )}
//     </AppContext.Consumer>
//   );
// };
