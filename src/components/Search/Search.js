import { searchViewContainer } from "./Search.module.css";
import { SearchView } from "..";
import { useAppContext } from "../../context/appContext";
import { useState } from "react";

import "./Search.module.css";
const Search = () => {
  const { appState, searchInput, showUploadVideo, videos } = useAppContext();
  const searchQuery = searchInput.toLowerCase();
  console.log(searchQuery);
  return (
    <div className={searchViewContainer}>
      {videos
        .filter(
          ({ data }) =>
            data.title.toLowerCase().includes(searchQuery) ||
            data.channelName.toLowerCase().includes(searchQuery) ||
            data.description.toLowerCase().includes(searchQuery)
        )
        .map(({ data }) => (
          <SearchView video={data} key={data.id} />
        ))}
    </div>
  );
};

export default Search;
