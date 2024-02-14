import React from 'react';

const VideoPlayer = ({ src }) => {

  return (
    <div className="flex flex-col">
      <video controls src={src} autoPlay>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;