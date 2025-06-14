import React from 'react'
import { useEffect, useState } from "react";
import {getVideoSrcDelayed} from './Hero';


const VideoPlayer = ({ currentIndex, loadedVideos, containerClass, handleVideoLoad }) => {
  // State to hold the video source URL. Initially empty.
  const [videoSrc, setVideoSrc] = useState('');

  // useEffect to handle the asynchronous video source fetching
  useEffect(() => {
    const fetchVideoSource = async () => {
	  const nextIndex = currentIndex;
      
      const newSrc = await getVideoSrcDelayed(nextIndex, loadedVideos);
      
      // Once we have the source, update the state
      setVideoSrc(newSrc);
    };

    fetchVideoSource();

  }, [currentIndex, loadedVideos]);

  return (
    <div className={`size-screen ${containerClass}`}>
      {videoSrc && (
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoad}
		  className='size-full object-cover object-center'
        />
      )}
    </div>
  );
};

export default VideoPlayer;