import { useRef } from "react"

const LoginScreen = ({ setData }) => {
  const refNick = useRef()
  const onSubmit = (event) => {
    event.preventDefault()
    if (refNick.current.nick.value && refNick.current.url.value) {
      setData(prev => ({ ...prev, user: refNick.current.nick.value, url: refNick.current.url.value,isJoined:true }))
    }
  }
  return (
    <div className="login-container">
      <div className="login-items">
        <div id="title">CinemAres</div>
            <form onSubmit={onSubmit} ref={refNick} className="login-form">
              <input placeholder="Enter Nick" name="nick" />
              <input placeholder="Movie URL" name="url" />
              <button id="login-button">Join</button>
            </form>
      </div >
    </div >
  )
}
export default LoginScreen;
