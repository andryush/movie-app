import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { page, onChangePage } = this.props;
    return (
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
    );
  }
}
export default Pagination;
