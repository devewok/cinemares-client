import { useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const ChatScreen = ({ tooglePlay, isStarted, startMovie, handleSetTime, handleGetTime, user }) => {
  const socket = useRef(io("http://3.88.118.58:5000"))
  const refMessage = useRef()
  var colorMessage = useRef("#FFFFFF")
  const refChat = useRef()
  const onCommand = useCallback((cmd, usercmd, extraData) => {
    switch (cmd) {
      case "#time":
        if (isStarted) {
          const message = { "data": `Tiempo de película: ${handleGetTime()}`, "user": user, "colorMessages": colorMessage.current }
          socket.current.emit("moviechat", message)
        }
        break;
      case "#clear":
        while (refChat.current.lastElementChild) {
          refChat.current.removeChild(refChat.current.lastElementChild)
        }
        break;
      case "#sync":
        if (isStarted) {
          handleSetTime(parseFloat(extraData))
        }
        break;
      case "#color":
        if (user === usercmd) {
          getRandomColor()
        }
        break;
      case "#start":
        if (!isStarted) {
          startMovie()
        }
        break;
      case "#play":
        if (isStarted) {
          tooglePlay(true)
        }
        break;
      case "#pause":
        if (isStarted) {
          tooglePlay(false)
        }
        break;
    }
  }, [tooglePlay, startMovie, handleGetTime, isStarted])
  const onSubmit = (event) => {
    event.preventDefault()
    const data = refMessage.current.value
    let message = { data, "user": user, "colorMessages": colorMessage.current, extraData: "" }
    if (data) {
      if (message.data === "#sync") {
        message.extraData = handleGetTime()
      }
      socket.current.emit("moviechat", message)
      refMessage.current.value = ""
    }
  }
  const handleMessage = useCallback((message) => {
    var divMessage = document.createElement('div');
    if (message.data[0] !== "#") {
      divMessage.textContent = message.user + " \u2192 " + message.data
    } else if (message.data === "#pause" && isStarted) {
      divMessage.textContent = message.user + " ha pausado la película"
    } else if (message.data === "#play" && isStarted) {
      divMessage.textContent = message.user + " ha iniciado la película"
    } else if (message.data === "#start" && !isStarted) {
      divMessage.textContent = "La película va a empezar "
    } else if (message.data === "#sync" && isStarted) {
      divMessage.textContent = message.user + " ha sincronizado la película"
    }
    divMessage.classList.add("chat-message")
    divMessage.style.color = message.colorMessages
    refChat.current.appendChild(divMessage)
    refChat.current.scrollTop = refChat.current.scrollHeight
  }, [handleSetTime, handleGetTime, isStarted])
  useEffect(() => {
    let callbackCmd = (message) => {
      try {
        onCommand(message.data, message.user, message.extraData)
      } catch (error) {
        console.log(error)

      }
      try {
        handleMessage(message)
      } catch (error) {

      }
    }
    socket.current.on("cmd", callbackCmd)
    return () => {
      socket.current.off("cmd", callbackCmd);
    }
  }, [onCommand, handleMessage])
  useEffect(() => {
    let callbackMoviechat = (message) => {
      handleMessage(message)
    }
    socket.current.on("moviechat", callbackMoviechat)
    return () => {
      socket.current.off("moviechat", callbackMoviechat);
    }
  }, [handleMessage])
  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colorMessage.current = color
  }
  return (
    <div id="chat-container">
      <div id="chat-messages" ref={refChat} />
      <form id="chat-form" onSubmit={onSubmit}>
        <input id="chat-input" placeholder="Chat" ref={refMessage} color={colorMessage.current} />
      </form>
    </div >
  )
}
export default ChatScreen;
