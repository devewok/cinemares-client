import { useCallback, useEffect } from "react";

const useReproductor = (refReproductor, data) => {
  const handleGetTime = useCallback(() => {
    const progress = (refReproductor.current.currentTime / refReproductor.current.duration) * 100;
    return progress
  }, [refReproductor])
  const handleSetTime = useCallback((time) => {
    if (!data.isPlaying)
      refReproductor.current.currentTime = (time * refReproductor.current.duration) / 100
  }, [refReproductor, data.isPlaying])
  useEffect(() => {
    if (refReproductor.current) {
      if (data.isPlaying) {
        refReproductor.current.play()
      } else {
        refReproductor.current.pause()
      }
    }
  }, [data.isPlaying, refReproductor])

  return { handleSetTime, handleGetTime }
}

export default useReproductor;
