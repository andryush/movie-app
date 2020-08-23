import React, { Component } from "react";

class Filters extends Component {
  render() {
      const {onChangeFilters, filters: {sort_by}} = this.props;
    return (
      <form>
        <div className="form-group">
          <label htmlFor="sortBy">Сортировать по:</label>
          <select className="form-control" id="sortBy" name="sort_by" onChange={onChangeFilters} value={sort_by}>
            <option value="popularity.desc">Популярные по убыванию</option>
            <option value="popularity.asc">Популярные по возростанию</option>
            <option value="vote_average.desc">Рейтинг по убыванию</option>
            <option value="vote_average.asc">Рейтинг по возростанию</option>
          </select>
        </div>
      </form>
    );
  }
}
export default Filters;
