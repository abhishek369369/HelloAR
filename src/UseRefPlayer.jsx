/* 
useRef    -> to get the adress of the video
useState  -> to use the indexing of the videoUrls
useEffect -> to implement keyup an keydown 
*/

import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

const videoUrls = ["/Videos/vid1.mp4", "/Videos/vid2.mp4", "/Videos/vid3.mp4"];
const videoTitles = ["Burning wood vide || 1080P ", "Serene sunset for a perfect evening", "Tiger on a hunt"];

export const UseRefPlayer = () => {
  const videoRef = useRef();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // to keep account whether arrow up is pressed or arrow down.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        playPreviousVideo();
      } else if (event.key === "ArrowDown") {
        playNextVideo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVideoIndex]);

  // when switching videos, setting back the like buttonn to defualt 'like'
  useEffect(() => {
    setIsLiked(false);
  }, [currentVideoIndex]);

  // when arrow down is pressed on keyboard, next video is played.
  const playNextVideo = () => {
    if (currentVideoIndex === videoUrls.length - 1) {
      setCurrentVideoIndex(0);
    } else if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // when arrow up is pressed on keyboard, previous video is played.
  const playPreviousVideo = () => {
    if (currentVideoIndex === 0) {
      setCurrentVideoIndex(videoUrls.length - 1);
    } else if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // when clicked on buttong 'play' , the video plays
  const handlePlay = () => {
    videoRef.current.play();
  };
  // when clicked on button 'pause' , the video pauses
  const handlePause = () => {
    videoRef.current.pause();
  };
  // handling like and dislike on the video, i.e toggling it
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="containerDiv">
      <div className="videoDiv">
        <div className="containerTitle">
          <h2> Previous Video </h2>
          <div className="iconDiv">
            <FaLongArrowAltUp
              style={{
                height: 22,
                width: 22,
              }}
            />
          </div>{" "}
          <h2> Next Video </h2>
          <div className="iconDiv">
            <FaLongArrowAltDown
              style={{
                height: 22,
                width: 22,
              }}
            />
          </div>
        </div>
        <div className="title">
          <h3>{videoTitles[currentVideoIndex]}</h3>
        </div>
        <video
          width={520}
          height={240}
          controls
          ref={videoRef}
          key={currentVideoIndex}
        >
          <source src={videoUrls[currentVideoIndex]} />
        </video>
        <div className="buttons">
          <button className="btn-play" onClick={handlePlay}>
            {" "}
            Play
          </button>{" "}
          <br></br>
          <button className="btn-pause" onClick={handlePause}>
            {" "}
            Pause
          </button>
          <button className={`btn-like`} onClick={handleLike}>
            {isLiked ? (
              <FaHeart
                style={{
                  color: "white",
                  height: 18,
                  width: 18,
                }}
              />
            ) : (
              <FaRegHeart
                style={{
                  color: "white",
                  height: 18,
                  width: 18,
                }}
              />
            )}
          </button>
        </div>
        <br></br>
      </div>
    </div>
  );
};