import { useRef, useState } from 'react';
import './App.css';
import LoginScreen from './components/screens/LoginScreen';
import { CSSTransition } from 'react-transition-group';
import useReproductor from "./components/hooks/useReproductor"
import ChatScreen from './components/screens/ChatScreen';
import MovieScreen from './components/screens/MovieScreen';

function App() {
  const [data, setData] = useState({ user: null, url: null, isPlaying: false, isStarted: false, isJoined: false })
  const refReproductor = useRef(null)
  const { handleGetTime, handleSetTime } = useReproductor(refReproductor, data);
  return (
    <div className="App">
      <CSSTransition in={data.isJoined} timeout={500} unmountOnExit mountOnEnter classNames="fade">
        <ChatScreen tooglePlay={(value) => setData(prev => ({ ...prev, isPlaying: prev.isStarted ? value : false }))} startMovie={() => setData(prev => ({ ...prev, isStarted: true }))} isStarted={data.isStarted} user={data.user} handleSetTime={handleSetTime} handleGetTime={handleGetTime} />
      </CSSTransition>
      {!data.isStarted
        ? <LoginScreen setData={setData} setIsJoined={() => setData(prev => ({ ...prev, isJoined: true }))} user={data.user} isStarted={data.isStarted} />
        : <MovieScreen ref={refReproductor} url={data.url} />}
    </div >
  );
}

export default App;
