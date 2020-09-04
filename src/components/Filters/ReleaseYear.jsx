import React, { Component } from "react";
import generateYears from "../../helpers/generateYears";

class ReleaseYear extends Component {
  static defaultProps = {
    years: generateYears(1950, 2025),
  };

  render() {
    const { years, primary_release_year, onChangeFilters } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primaryReleaseYear">Год релиза:</label>
        <select
          className="form-control"
          id="primaryReleaseYear"
          name="primary_release_year"
          onChange={onChangeFilters}
        >
          <option>Выберите год</option>
          {years.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
export default ReleaseYear;
