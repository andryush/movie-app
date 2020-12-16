import React from "react";
import { AppContext } from "../App/App";

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
export default (props) => {
  return (
    <AppContext.Consumer>
      {(context) => <User user={context.user} {...props} />}
    </AppContext.Consumer>
  );
};
