import React, { Component } from "react";
import LoginForm from "../Login/LoginForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class LoginModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.showModal} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>Авторизация</ModalHeader>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}
export default LoginModal;
