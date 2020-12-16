import React, { Component } from "react";
import LoginForm from "../Login/LoginForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  // fetchApi(`${API_URL}authentication/token/new?api_key=${API_KEY_V3}`).then(
  //   (requestToken) => {
  //     return fetchApi(
  //       `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY_V3}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: "andryush",
  //           password: "asdf2020",
  //           request_token: requestToken.request_token,
  //         }),
  //       }
  //     ).then((requestTokenForId) => {
  //       return fetchApi(
  //         `${API_URL}authentication/session/new?api_key=${API_KEY_V3}`,
  //         {
  //           method: "POST",
  //           mode: "cors",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             request_token: requestTokenForId.request_token,
  //           }),
  //         }
  //       )
  //         .then((sessionId) => console.log(sessionId))
  //         .catch((error) => console.log(error));
  //     });
  //   }
  // );

  ///////////////////////////////////////////////////////////////////
  // Using Promises
  // const getRequestToken = () => {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${API_URL}authentication/token/new?api_key=${API_KEY_V3}`)
  //       .then((response) => {
  //         if (response.status < 400) {
  //           return response.json();
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .then((data) => resolve(data))
  //       .catch((response) => response.json().then((error) => reject(error)));
  //   });
  // };

  // const validateWithLogin = (body) => {
  //   return new Promise((resolve, reject) => {
  //     fetch(
  //       `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY_V3}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: "andryush",
  //           password: "asdf2020",
  //           request_token: body.request_token,
  //         }),
  //       }
  //     )
  //       .then((response) => {
  //         if (response.status < 400) {
  //           return response.json();
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .then((data) => resolve(data))
  //       .catch((data) => data.json().then((error) => reject(error)));
  //   });
  // };

  // const getSessionId = (data) => {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${API_URL}authentication/session/new?api_key=${API_KEY_V3}`, {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ request_token: data.request_token }),
  //     })
  //       .then((response) => {
  //         if (response.status < 400) {
  //           return response.json();
  //         } else {
  //           throw response;
  //         }
  //       })
  //       .then((data) => resolve(data))
  //       .catch((response) => response.json().then((error) => reject(error)));
  //   });
  // };

  // getRequestToken().then((data) => {
  //   return validateWithLogin(data).then((data) => {
  //     return getSessionId(data).then((data) => console.log(data));
  //   });
  // });

  ///////////////////////////////////////////////////////////////////
  // Using only fetch
  // fetch(`${API_URL}authentication/token/new?api_key=${API_KEY_V3}`)
  //   .then((response) => response.json())
  //   .then((tokenData) => {
  //     // Validating token with login
  //     fetch(
  //       `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY_V3}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: "andryush",
  //           password: "asdf2020",
  //           request_token: tokenData.request_token,
  //         }),
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((validatedTokenData) => {
  //         // Creating session
  //         fetch(
  //           `${API_URL}authentication/session/new?api_key=${API_KEY_V3}`,
  //           {
  //             method: "POST",
  //             mode: "cors",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               request_token: validatedTokenData.request_token,
  //             }),
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((session) => console.log(session));
  //       });
  //   });
  toggleModal = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={this.toggleModal}
        >
          Вход
        </button>
        <Modal isOpen={this.state.show} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Авторизация</ModalHeader>
          <ModalBody>
            <LoginForm
            // updateUser={this.props.updateUser}
            // updateSessionId={this.props.updateSessionId}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Login;
