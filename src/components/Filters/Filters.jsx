import React, { Component } from "react";

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
        <div className="form-group">
          <label htmlFor="sortBy">Сортировать по:</label>
          <select
            className="form-control"
            id="sortBy"
            name="sort_by"
            onChange={onChangeFilters}
            value={sort_by}
          >
            <option value="popularity.desc">Популярные по убыванию</option>
            <option value="popularity.asc">Популярные по возростанию</option>
            <option value="vote_average.desc">Рейтинг по убыванию</option>
            <option value="vote_average.asc">Рейтинг по возростанию</option>
          </select>
        </div>

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
