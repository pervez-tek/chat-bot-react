import {Chatbot} from "supersimpledev";
import dayjs from 'dayjs';

import { useState} from 'react';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }
  function trigger(event) {

    if (event.key === 'Enter') {
      saveInputText(event);
      sendMessage();
    }
    if (event.key === 'Escape') {
      setInputText("");
    }
  }

  function sendMessage() {
    //chatMessages.push({ message: 'test', sender: 'user', id: crypto.randomUUID() })
    console.log(chatMessages)
    const newChatMessages = [...chatMessages, { message: inputText, sender: 'user', id: crypto.randomUUID(), time: dayjs().format('HH:mm A') }];
    setChatMessages(newChatMessages);
    setInputText("");
    const response = Chatbot.getResponse(inputText);
    console.log("Welcome", response);
    setChatMessages([...newChatMessages, { message: response, sender: 'robot', id: crypto.randomUUID(), time: dayjs().format('HH:mm A') }]);
  }
  return (
    <div className="chat-input-container">
      <input
        className='chat-input'
        placeholder="Send a message to Chatbot" size="30" onChange={saveInputText} value={inputText} onKeyDown={trigger} />
      <button
        className="send-button"
        onClick={sendMessage}>Send</button>
    </div>
  );
}

