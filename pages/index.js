import React from 'react';
import Playlist from '../components/Playlist';

const HomePage = () => {
  return (
    <div>
      <h1 className='text-center text-4xl mt-8'>Video Player</h1>
      <Playlist />
    </div>
  );
};

export default HomePage;