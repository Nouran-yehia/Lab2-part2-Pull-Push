import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import './index.js';

let id = Math.ceil(Math.random()*10000);

const App= (props) => {
     const [messages, setMessages] = useState([])
     const [uname, setUnames] = useState([])
     const [input, setInput] = useState('');
     const [inputUser, setinputUser] = useState('');
     
     useEffect (()=> {
      const eventSource = new EventSource('http://localhost:3000/subscribers');
      eventSource.onmessage = (e) =>{
        const data = JSON.parse(e.data);
        setMessages(messages => messages.concat(data));
        setUnames((uname)=> uname.concat(data));
      }
  },[]); //[] to call it once 

     const handleChangeM = (e) =>{
       const{target:{value}} = e
       setInput(value)
     }

     const handleSubmit = (e) => {
       e.preventDefault();
       axios.post('http://localhost:3000/messageSubscribers',{content: input, uname:inputUser}).then(()=> setInput(''))

       } 
         
     const handleChangeU = (e) =>{
      const{target:{value}} = e
      setinputUser(value)
    }
      return(
         <div className="App">
      <header className="App-header">
      <form name="publish" id="form" onSubmit={handleSubmit}>
            <input id="content"  type="text" name="content" placeholder="Enter your message"  onChange={handleChangeM} value={input} />
            <input id="username" type="text" name="uname" placeholder="Enter your name" onChange={handleChangeU} value={inputUser} />
            <input type="submit"  />
          </form>

          <div id="content">
            <table>
              <tr>
                <td>
               {
                  messages.map(m => <h4 key={m.content}>{m.content}</h4>)
                  }
                  </td>
                  <td>
                      {uname.map(n => <h6 key={n.uname}>From: {n.uname}</h6>)}

                  </td>
                  
                 
              </tr>
            </table>
                 
                  </div>
                  <div>
                  <br></br>

          </div>
      </header>
    </div>
  );
     }


export default App;