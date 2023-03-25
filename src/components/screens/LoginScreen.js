import { useRef } from "react"
import { CSSTransition } from "react-transition-group"

const LoginScreen = ({ setIsJoined, setData, user }) => {
  const refNick = useRef()
  const nodeRef1 = useRef(null)
  const onSubmit = (event) => {
    event.preventDefault()
    if (refNick.current.nick.value && refNick.current.url.value) {
      setData(prev => ({ ...prev, user: refNick.current.nick.value, url: refNick.current.url.value }))
    }
  }
  return (
    <div className="login-container">
      <div className="login-items">
        <div id="title">CinemAres</div>
        <CSSTransition in={!user} nodeRef={nodeRef1} timeout={500} unmountOnExit onExited={setIsJoined} classNames="fade">
          <div ref={nodeRef1}>
            <form onSubmit={onSubmit} ref={refNick} className="login-form">
              <input placeholder="Enter Nick" name="nick" />
              <input placeholder="Movie URL" name="url" />
              <button id="login-button">Join</button>
            </form>
          </div>
        </CSSTransition >
      </div >
    </div >
  )
}
export default LoginScreen;
