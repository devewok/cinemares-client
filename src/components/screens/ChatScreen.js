import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const ChatScreen = ({ tooglePlay, handleGetTime, user }) => {
  const socket = io("https://cinemares-server-production.up.railway.app:7521")
  const refMessage = useRef()
  var colorMessage = useRef("#FFFFFF")
  const refChat = useRef()
  const onCommand = {
    "#pause": () => tooglePlay(),
    "#play": () => tooglePlay(),
    "#color": () => getRandomColor(),
    "#clear": () => {
      while (refChat.current.lastElementChild) {
        refChat.current.removeChild(refChat.current.lastElementChild)
      }
    },
    "#time": () => console.log(handleGetTime())
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const data = refMessage.current.value
    const message = { "data": data, "user": user, "colorMessages": colorMessage.current }
    if (data) {
      handleMessage(message)
      if (data[0] === "#") {
        try {
          onCommand[data]();
        } catch (error) {

        }
      }
      socket.emit("moviechat", message)
      refMessage.current.value = ""
    }
  }
  const handleMessage = (message) => {
    var divMessage = document.createElement('div');
    if (message.data[0] !== "#") {
      divMessage.textContent = message.user + " \u2192 " + message.data
    } else if (message.data === "#pause") {
      divMessage.textContent = message.user + " ha pausado la película"
    } else if (message.data === "#play") {
      divMessage.textContent = message.user + " ha iniciado la película"
    }
    divMessage.classList.add("chat-message")
    divMessage.style.color = message.colorMessages
    refChat.current.appendChild(divMessage)
    refChat.current.scrollTop = refChat.current.scrollHeight
  }
  useEffect(() => {
    const callback = (message) => {
      if (message.user !== user) {
        handleMessage(message)
        if (message.data[0] === "#" && message.data !== "#color") {
          onCommand[message.data]();
        }
      }
    }
    socket.on("moviechat", callback)
    return () => {
      socket.off("moviechat", callback);
    }
  })
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
        <input placeholder="Chat" ref={refMessage} color={colorMessage.current} />
      </form>
    </div >
  )
}
export default ChatScreen;
