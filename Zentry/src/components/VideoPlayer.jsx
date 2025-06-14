import { useEffect, useState } from "react";
import {getVideoSrcDelayed} from './Hero';


const VideoPlayer = ({ currentIndex, loadedVideos, totalVideos, handleVideoLoad }) => {
  // State to hold the video source URL. Initially empty.
  const [videoSrc, setVideoSrc] = useState('');

  // useEffect to handle the asynchronous video source fetching
  useEffect(() => {
    const fetchVideoSource = async () => {
      const nextIndex = currentIndex === totalVideos - 1 ? 1 : currentIndex;
      
      // Call your async function and wait for the result
      const newSrc = await getVideoSrcDelayed(nextIndex, loadedVideos);
      
      // Once we have the source, update the state
      setVideoSrc(newSrc);
    };

    fetchVideoSource();

  }, [currentIndex, loadedVideos]);

  return (
    <div>
      {videoSrc && (
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoad}
        />
      )}
    </div>
  );
};

export default VideoPlayer;