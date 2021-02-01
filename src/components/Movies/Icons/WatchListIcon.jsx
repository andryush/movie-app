import React from "react";

import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { withAuth } from "../../../hoc/withAuth";

function WatchListIcon({
  auth: { watchList },
  authActions: { toggleWatchListMovies },
  id,
}) {
  let isWatchListed = false;
  if (watchList.length > 0) {
    let watchListIDs = watchList.map((el) => el.id);
    isWatchListed = watchListIDs.includes(id) ? true : false;
  }
  return (
    <>
      {isWatchListed ? (
        <Bookmark onClick={() => toggleWatchListMovies(id)} />
      ) : (
        <BookmarkBorder onClick={() => toggleWatchListMovies(id)} />
      )}
    </>
  );
}
export default withAuth(WatchListIcon);
