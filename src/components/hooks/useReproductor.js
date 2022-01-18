import {useEffect, useState} from "react";

const useReproductor = (refReproductor) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const tooglePlay = () => {
    setIsPlaying(prev => !prev)
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
    isPlaying
      ? refReproductor.current.play()
      : refReproductor.current.pause()
  }, [isPlaying, refReproductor])

  return {tooglePlay, handleSetTime, handleGetTime}
}

export default useReproductor;
