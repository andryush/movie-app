import React from "react";
import { AppContextHOC } from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

class UserMenu extends React.Component {
  state = {
    isOpen: false,
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onLogout = async (session_id) => {
    await CallApi.delete("authentication/session", {
      body: { session_id: session_id },
    });
    this.props.deleteSessionId();
  };

  render() {
    return (
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggleDropdown}>
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={this.state.isOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://www.themoviedb.org/t/p/w64_and_h64_face${this.props.user.avatar.tmdb.avatar_path}`}
            alt="Avatar"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            className="text-center"
            onClick={() => this.onLogout(this.props.session_id)}
          >
            Выйти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
export default AppContextHOC(UserMenu);
