import { useEffect, useRef, useState } from 'react';
import './App.css';
import LoginScreen from './components/screens/LoginScreen';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styled from "styled-components";
import useReproductor from "./components/hooks/useReproductor"
import ChatScreen from './components/screens/ChatScreen';
import MovieScreen from './components/screens/MovieScreen';

// const FadeDiv = styled.div`
// transition: 3s;
// opacity: ${({state}) => (state === "entered" ? 1 : 0)};
// display: ${({state}) => (state === "exited" ? "none" : "block")};
// `;
// const FadeTransition = ({children, ...rest}) => (
// <Transition {...rest}>
// {state => <FadeDiv state={state}>{children}</FadeDiv>}
// </Transition>
// );
function App() {
  const [data, setData] = useState({ user: null, url: null })
  const [isJoined, setIsJoined] = useState(false)
  const refReproductor = useRef(null)
  const { isStarted, tooglePlay, handleGetTime } = useReproductor(refReproductor);
  return (
    <div className="App">
      <CSSTransition in={isJoined} timeout={500} unmountOnExit mountOnEnter classNames="fade">
        <ChatScreen tooglePlay={tooglePlay} user={data.user} handleGetTime={handleGetTime} />
      </CSSTransition>
      {!isStarted
        ? <LoginScreen setData={setData} setIsJoined={setIsJoined} user={data.user} isStarted={isStarted} />
        : <MovieScreen ref={refReproductor} url={data.url} />}
    </div >
  );
}

export default App;
