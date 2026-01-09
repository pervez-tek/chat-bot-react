import {Chatbot} from "supersimpledev";

import { ChatInput } from "./components/ChatInput";

import { useState, useEffect ,useRef} from 'react';
import User from "./assets/user.png";
import Robot from "./assets/robot.png";
import dayjs from 'dayjs';

import './App.css'



function ChatMessage(props) {
  const { message, sender, time, id } = props;
  //const sender = props.sender;



  return (
    <div id={id}
      className={sender === 'robot' ? 'chat-input-robot' : 'chat-input-user'}>
      {sender === 'robot' && (
        <img src={Robot} className='chat-message-profile' />
      )}
      <div className='chat-message-text'> {message} &nbsp;&nbsp;<sub>{time} &#10003;&#10003;</sub></div>
      {
        sender === 'user' && (
          <img src={User} className='chat-message-profile' />
        )
      }
    </div >
  );
}

function ChatMessages({ chatMessages }) {
  const chatMsgContainerRef = useRef();

  useEffect(() => {
    console.log(chatMsgContainerRef);
    const cont = chatMsgContainerRef.current;

    cont.scrollTop = cont.scrollHeight;
  }, [chatMessages]);
  return (
    <div ref={chatMsgContainerRef} className="chat-message-container">
      {
        chatMessages.map((chatMessage, index) => {
          return (<ChatMessage key={chatMessage.id}
            time={chatMessage.time}
            message={chatMessage.message} sender={chatMessage.sender} />)
        })
      }
    </div>
  );

}

function App() {
  const array = useState([
    { message: "hello chatbot", sender: "user", id: crypto.randomUUID(), time: dayjs().format('HH:mm A') },
    { message: "Hello! How can I help you?", sender: "robot", id: crypto.randomUUID(), time: dayjs().format('HH:mm A') },
    { message: "can you get me today date", sender: "user", id: crypto.randomUUID(), time: dayjs().format('HH:mm A') },
    { message: "Today is December 13", sender: "robot", id: crypto.randomUUID(), time: dayjs().format('HH:mm A') }
  ]);
  const chatMessages = array[0];
  const setChatMessages = array[1];

  return (
    <div className='app-container'>

      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />

    </div>
  );
}

export default App;
