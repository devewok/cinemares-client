import { useCallback, useEffect, useRef } from "react";

const useReproductor = (data) => {
  const refReproductor=useRef()
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
      console.log(data)
    }
  }, [data.isPlaying, refReproductor.current])

  const ReproductorElement=useCallback(()=>{
      return <video id="reproductor" className="reproductor" ref={refReproductor} src={data.url.indexOf("http") === 0 ? data.url : "http://198.58.100.116:3003/video/" + data.url} type="video/mp4" />
  
  },[data.url])

  return { handleSetTime, handleGetTime, ReproductorElement }
}

export default useReproductor;
