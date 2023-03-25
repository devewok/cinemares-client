import { forwardRef } from "react";

const MovieScreen = forwardRef(({ url }, ref) => {
  return (
    <div>
      <video id="reproductor" className="reproductor" ref={ref} src={url.indexOf("http") === 0 ? url : "http://3.88.118.58:5000/video/" + url} type="video/mp4" />
    </div>
  )
})
export default MovieScreen;
