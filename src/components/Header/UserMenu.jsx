import React from "react";
import CallApi from "../../api/api";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { withAuth } from "../../hoc/withAuth";

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
    this.props.authActions.deleteSessionId();
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
            src={`https://www.themoviedb.org/t/p/w64_and_h64_face${this.props.auth.user.avatar.tmdb.avatar_path}`}
            alt="Avatar"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            className="text-center"
            onClick={() => this.onLogout(this.props.auth.session_id)}
          >
            Выйти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
export default withAuth(UserMenu);
