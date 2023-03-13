import { forwardRef } from "react";

const MovieScreen = forwardRef(({ url }, ref) => {

  return (
    <div>
      <video id="reproductor" ref={ref} src={url} type="video/mp4" />
    </div>
  )
})
export default MovieScreen;
