import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Heading, IconButton, Progress, Text } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

interface Song {
  title: string;
  artist: string;
  src: string;
}

const songs: Song[] = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "path/to/song1.mp3",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "path/to/song2.mp3",
  },
  // Add more songs here
];

const MusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current?.currentTime || 0;
    const duration = audioRef.current?.duration || 0;
    setProgress((currentTime / duration) * 100);
  };

  const currentSong = songs[currentSongIndex];

  return (
    <Box>
      <Heading size="md" mb={4}>
        Music Player
      </Heading>
      <Text fontWeight="bold">{currentSong.title}</Text>
      <Text>{currentSong.artist}</Text>
      <Progress value={progress} mb={4} />
      <Flex justify="center">
        <IconButton aria-label="Previous" icon={<FaStepBackward />} onClick={handlePrev} mr={2} />
        {isPlaying ? <IconButton aria-label="Pause" icon={<FaPause />} onClick={handlePause} mr={2} /> : <IconButton aria-label="Play" icon={<FaPlay />} onClick={handlePlay} mr={2} />}
        <IconButton aria-label="Next" icon={<FaStepForward />} onClick={handleNext} />
      </Flex>
      <audio ref={audioRef} src={currentSong.src} onEnded={handleNext} onTimeUpdate={handleTimeUpdate} />
    </Box>
  );
};

export default MusicPlayer;
