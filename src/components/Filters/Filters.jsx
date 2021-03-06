import React, { Component } from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import ReleaseYear from "./ReleaseYear";
import Genres from "./Genres";

class Filters extends Component {
  render() {
    const {
      onChangeFilters,
      onChangePage,
      filters: { sort_by, primary_release_year, genres },
      page,
      total_pages,
      resetFilters,
    } = this.props;

    return (
      <form>
        <SortBy onChangeFilters={onChangeFilters} sort_by={sort_by} />
        <ReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres onChangeFilters={onChangeFilters} genres={genres} />
        <button className="btn btn-danger w-100" onClick={resetFilters}>
          Очистить фильтры
        </button>
        <Pagination
          page={page}
          onChangePage={onChangePage}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
export default Filters;
