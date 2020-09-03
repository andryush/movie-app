import React, { Component } from "react";
import SortBy from "./SortBy";

class Filters extends Component {
  render() {
    const {
      onChangeFilters,
      onChangePage,
      filters: { sort_by },
      page,
    } = this.props;
    return (
      <form>
        <SortBy onChangeFilters={onChangeFilters} sort_by={sort_by} />

        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            name="prev"
            onClick={onChangePage.bind(null, page - 1)}
            disabled={page === 1}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            name="next"
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
      </form>
    );
  }
}
export default Filters;
