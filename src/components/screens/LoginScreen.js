import {useRef} from "react"

const LoginScreen = ({setUser, setIsJoined}) => {
  const refNick = useRef()
  const onSubmit = (event) => {
    event.preventDefault()
    setUser(refNick.current.value)
    setIsJoined(true)
  }
  return (
    <div className="login-container">
      <div className="login-items">
        <div id="title">CinemAres</div>
        <form onSubmit={onSubmit}>
          <input placeholder="Enter Nick" ref={refNick} />
        </form>
      </div>
    </div>
  )
}

export default LoginScreen;
