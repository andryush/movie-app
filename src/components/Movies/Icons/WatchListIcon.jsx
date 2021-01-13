import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";

import { Bookmark, BookmarkBorder } from "@material-ui/icons";

function WatchListIcon({ id, watchList, addRemoveWatchList }) {
  let isWatchListed = false;
  if (watchList.length > 0) {
    let watchListIDs = watchList.map((el) => el.id);
    isWatchListed = watchListIDs.includes(id) ? true : false;
  }
  return (
    <>
      {isWatchListed ? (
        <Bookmark onClick={() => addRemoveWatchList(id)} />
      ) : (
        <BookmarkBorder onClick={() => addRemoveWatchList(id)} />
      )}
    </>
  );
}
export default AppContextHOC(WatchListIcon);
