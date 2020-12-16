import React from "react";
import { AppContext } from "../App/App";

export default (Component) =>
  class extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {(context) => <Component {...this.props} {...context} />}
        </AppContext.Consumer>
      );
    }
  };
