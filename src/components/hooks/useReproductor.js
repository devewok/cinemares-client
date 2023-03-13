import {useEffect, useState} from "react";

const useReproductor = (refReproductor) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const tooglePlay = () => {
    setIsPlaying(prev => !prev)
    if (!isStarted)
      setIsStarted(true)
  }
  const handleGetTime = () => {
    const progress = (refReproductor.current.currentTime / refReproductor.current.duration) * 100;
    return progress
  }
  const handleSetTime = (time) => {
    setIsPlaying(false)
    refReproductor.current.currentTime = time
  }
  useEffect(() => {
    if (refReproductor.current) {
      isPlaying
        ? refReproductor.current.play()
        : refReproductor.current.pause()
    }
  }, [isPlaying, refReproductor])

  return {isStarted, tooglePlay, handleSetTime, handleGetTime}
}

export default useReproductor;
