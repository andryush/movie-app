import React from "react";
import { AppContextHOC } from "../../HOC/AppContextHOC";

import { Bookmark, BookmarkBorder } from "@material-ui/icons";

function WatchListIcon({ id, watchList, asyncAddRemoveWatchList }) {
  let isWatchListed = false;
  if (watchList.length > 0) {
    let watchListIDs = watchList.map((el) => el.id);
    isWatchListed = watchListIDs.includes(id) ? true : false;
  }
  return (
    <>
      {isWatchListed ? (
        <Bookmark onClick={() => asyncAddRemoveWatchList(id)} />
      ) : (
        <BookmarkBorder onClick={() => asyncAddRemoveWatchList(id)} />
      )}
    </>
  );
}
export default AppContextHOC(WatchListIcon);
