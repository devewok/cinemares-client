import { useState } from 'react';
import './App.css';
import LoginScreen from './components/screens/LoginScreen';
import useReproductor from "./components/hooks/useReproductor"
import ChatScreen from './components/screens/ChatScreen';

function App() {
  const [data, setData] = useState({ user: null, url: null, isPlaying: false, isStarted: false, isJoined: false })
  const { handleGetTime, handleSetTime, ReproductorElement } = useReproductor(data);
  return (
    <div className="App">
      {!data.isJoined
        ? <LoginScreen setData={setData} isStarted={data.isStarted} />
        : (
          <>
            <ChatScreen tooglePlay={(value) => setData(prev => ({ ...prev, isPlaying: prev.isStarted ? value : false }))} startMovie={() => setData(prev => ({ ...prev, isStarted: true }))} isStarted={data.isStarted} user={data.user} handleSetTime={handleSetTime} handleGetTime={handleGetTime} />
            <ReproductorElement />
          </>
        )}
    </div >
  );
}

export default App;
