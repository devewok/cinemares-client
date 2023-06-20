import { useRef, useState } from 'react';
import './App.css';
import LoginScreen from './components/screens/LoginScreen';
import useReproductor from "./components/hooks/useReproductor"
import ChatScreen from './components/screens/ChatScreen';
import MovieScreen from './components/screens/MovieScreen';

function App() {
  const [data, setData] = useState({ user: null, url: null, isPlaying: false, isStarted: false, isJoined: false })
  const refReproductor = useRef(null)
  const { handleGetTime, handleSetTime } = useReproductor(refReproductor, data);
  return (
    <div className="App">
      {!data.isJoined
        ? <LoginScreen setData={setData} isStarted={data.isStarted} />
        : (
          <>
            <MovieScreen ref={refReproductor} url={data.url} />
            <ChatScreen tooglePlay={(value) => setData(prev => ({ ...prev, isPlaying: prev.isStarted ? value : false }))} startMovie={() => setData(prev => ({ ...prev, isStarted: true }))} isStarted={data.isStarted} user={data.user} handleSetTime={handleSetTime} handleGetTime={handleGetTime} />
          </>
        )}
    </div >
  );
}

export default App;
