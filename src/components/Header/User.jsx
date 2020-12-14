import React from "react";

class User extends React.Component {
  render() {
    return (
      <img
        width="40"
        className="rounded-circle"
        src={`https://www.themoviedb.org/t/p/w64_and_h64_face${this.props.user.avatar.tmdb.avatar_path}`}
        alt="Avatar"
      />
    );
  }
}
export default User;
