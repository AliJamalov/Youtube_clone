export const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};
