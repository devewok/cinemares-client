import { forwardRef } from "react";

const MovieScreen = forwardRef(({ url }, ref) => {
  return (
    <video id="reproductor" className="reproductor" ref={ref} src={url.indexOf("http") === 0 ? url : "http://198.58.100.116:3003/video/" + url} type="video/mp4" />
  )
})
export default MovieScreen;
