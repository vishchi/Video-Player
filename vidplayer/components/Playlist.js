import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

const Playlist = () => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [videosData, setVideosData] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    fetch('/media.json')
      .then((response) => response.json())
      .then((data) => setVideosData(data.categories[0].videos));
  }, []);

  const handleVideoSelect = (index) => {
    setSelectedVideoIndex(index);
  };

  const handleDragStart = (event, index) => {
    setDraggedItem({ index });
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  
  const handleDrop = (event, index) => {
    if (draggedItem && draggedItem.index !== index) {
      const newVideos = [...videosData];
      const draggedVideo = newVideos[draggedItem.index];
      newVideos.splice(draggedItem.index,  1);
      newVideos.splice(index,  0, draggedVideo);
      setVideosData(newVideos);
    }
    setDraggedItem(null);
  };

  return (
    <div className="bg-black min-h-screen flex items-center gap-20 pl-10">
      <div className="w-3/5">
        <VideoPlayer
          src={videosData[selectedVideoIndex]?.sources[0]}
          className="w-full object-cover"
        />
        <h2 className="w-full text-white text-3xl font-bold p-4">{videosData[selectedVideoIndex]?.title}</h2>
        <p className="text-white text-xl p-4">{videosData[selectedVideoIndex]?.description}</p>
      </div>
      <div>
        <p className="text-white text-xl text-center mb-4">PLAYLIST</p>
        <ul className="space-y-2">
          {Array.isArray(videosData) && videosData.map((video, index) => (
            <li
              key={video.title}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
              onClick={() => handleVideoSelect(index)}
              className={`cursor-pointer p-2 rounded hover:bg-gray-200 hover:text-black ${index === selectedVideoIndex ? 'text-black bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-black' : ''}`}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;