import React from "react";
import { NavLink } from "react-router-dom";

class Tabs extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to={`/movie/${id}/details`} className="nav-link">
              Детали
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/movie/${id}/videos`} className="nav-link">
              Видео
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/movie/${id}/credits`} className="nav-link">
              Актеры
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
export default Tabs;
