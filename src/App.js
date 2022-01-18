import {useRef, useState} from 'react';
import './App.css';
import MovieScreen from './components/screens/MovieScreen';
import LoginScreen from './components/screens/LoginScreen';
import {CSSTransition} from 'react-transition-group';
import {SwitchTransition, Transition} from 'react-transition-group';
import styled from "styled-components";

const FadeDiv = styled.div`
  transition: 2.5s;
  opacity: ${({state}) => (state === "entered" ? 1 : 0)};
  display: ${({state}) => (state === "exited" ? "none" : "block")};
`;
const FadeTransition = ({children, ...rest}) => (
  <Transition {...rest}>
    {state => <FadeDiv state={state}>{children}</FadeDiv>}
  </Transition>
);
function App() {
  const [isJoined, setIsJoined] = useState(false)
  const [user, setUser] = useState("")
  const nodeRef = useRef(null);
  return (
    <div className="App">
      <SwitchTransition>
        <FadeTransition timeout={500} nodeRef={nodeRef} unmountOnExit key={isJoined ? "movie" : "login"}>
          {isJoined
            ? <MovieScreen user={user} />
            : <LoginScreen setUser={setUser} setIsJoined={setIsJoined} />
          }
        </FadeTransition>
      </SwitchTransition>
    </div >
  );
}

// return (
// <div className="App">
// {isJoined
// ? (<MovieScreen user={user} />)
// : (<LoginScreen setUser={setUser} setIsJoined={setIsJoined} />)}
// </div>
// );
export default App;
