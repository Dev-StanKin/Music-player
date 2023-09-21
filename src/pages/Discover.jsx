import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import {
  useGetSongsByGenreQuery,
  useGetTopChartsQuery,
} from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { tracks } = useGetSongsByGenreQuery();
  const { tracks } = useGetTopChartsQuery();

  // if (isFetching) return <Loader title="Loading songs..." />;

  // if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  const currentTime = new Date().getHours();
  let greeting;

  if (currentTime < 12) {
    greeting = 'Good morning!';
  } else if (currentTime < 18) {
    greeting = 'Good afternoon!';
  } else {
    greeting = 'Good evening!';
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-white text-2xl">{greeting}</h2>
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'Pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {tracks?.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks?.map((song, i) => (
          <SongCard
            key={song.key}
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

export default Discover;
