import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { term } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: tracks, isFetching, error } = useGetSongsBySearchQuery(term);

  const songs = tracks?.tracks?.hits.map((song) => song.track);

  if (isFetching) return <Loader title={`Searching ${term}...`} />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{term}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song?.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            tracks={tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
