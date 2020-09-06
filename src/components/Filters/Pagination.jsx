import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { page, total_pages, onChangePage } = this.props;
    return (
      <>
        <div className="btn-group d-flex justify-content-center">
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
            disabled={page === total_pages}
          >
            Вперед
          </button>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <p>
            {page} of {total_pages}
          </p>
        </div>
      </>
    );
  }
}
export default Pagination;
