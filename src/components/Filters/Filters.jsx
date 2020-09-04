import React, { Component } from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import ReleaseYear from "./ReleaseYear";

class Filters extends Component {
  render() {
    const {
      onChangeFilters,
      onChangePage,
      filters: { sort_by, primary_release_year },
      page,
    } = this.props;

    return (
      <form>
        <SortBy onChangeFilters={onChangeFilters} sort_by={sort_by} />
        <ReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Pagination page={page} onChangePage={onChangePage} />
      </form>
    );
  }
}
export default Filters;
