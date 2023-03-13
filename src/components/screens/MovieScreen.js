const MovieScreen = ({refReproductor, url}) => {

  return (
    <div>
      <video id="reproductor" ref={refReproductor} src={url} type="video/mp4" />
    </div>
  )
}
export default MovieScreen;
