import {useRef} from "react";
import useReproductor from "../hooks/useReproductor"
import ChatScreen from './ChatScreen';

const MovieScreen = ({user}) => {

  const refReproductor = useRef()
  const {tooglePlay, handleGetTime} = useReproductor(refReproductor);

  return (
    <div>
      <ChatScreen tooglePlay={tooglePlay} user={user} handleGetTime={handleGetTime} />
      <video id="reproductor" src="http://localhost:3000/video" ref={refReproductor} typeof="video/mp4" />
    </div>
  )
}

export default MovieScreen;
