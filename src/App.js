import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon-2.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { main } from './chatmodel';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([
    {
      text: "Hi,I am machine developed by Chetanya which can assist you with your queries.",
      isBot: true,
    }
  ]);
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);
  const handleSend = async () => {
    const text = input;
    setInput('')
    setMessages([...messages,{text,isBot:false}])
    const res = await main(text);
    setMessages([...messages,
      {
        text: input,
        isBot: false
      },
      {
        text: res,
        isBot: true
      }
    ]);
  }

  const handleEnter = async (e) => {
    if(e.key === 'Enter')
      await handleSend();
  }
  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text,isBot:false}
    ]);
    const res = await main(text);
    setMessages([...messages,
      {
        text,
        isBot: false
      },
      {
        text: res,
        isBot: true
      }
    ]);
  }

  return (
    <div className = "App">
      <div className = "sideBar">
        <div className = "upperSide">
          <div className = "upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className = "midBtn" onClick = { () => window.location.reload()}><img src={addBtn} alt="new Chat" className="addBtn"/>New Chat</button>
          <div className= 'upperSideBottom'>
            <button className='query' onClick={handleQuery} value={"What is programming ?"}>
              <img src={msgIcon} alt="Query" />
              <span>What is programming ?</span>
            </button>
            <button className='query' onClick={handleQuery} value={"How to use API ?"}>
              <img src={msgIcon} alt="Query" />
              <span>How to use API ?</span>
            </button>
          </div>
        </div>
        <div className = "lowerSide">
          <div className="listItems"><img src={home} alt="" className="listitemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="" className="listitemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="" className="listitemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className = "main">
        <div className="chats">
          {messages.map((message,i) => 
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt=""/><p className = "txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className = "chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a message' value={input} onKeyDown = {handleEnter} onChange={(e) => {setInput(e.target.value)} } /><button className = "send" onClick={handleSend}><img src={sendBtn} alt="sendBtn"/></button>
          </div>
          <p>ChatGPT may produce inaccurate information about people,places or fact.</p>
        </div>
      </div>
    </div>
  );
}

export default App;