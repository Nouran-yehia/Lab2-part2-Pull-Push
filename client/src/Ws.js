import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';





// let id = Math.ceil(Math.random()*10000);

const Ws = (props) => {
     const [messages, setMessages] = useState([])
     const [uname, setUname] = useState([])
     const [input, setInput] = useState('');
     const [inputUser, setinputUser] = useState('');
     const socket = io.connect('http://localhost:3000/');
     
useEffect (()=> {
    socket.on('new-message',(message,uname)=>{setMessages(messages => messages.concat(message))
    setUname(uname => uname.concat(uname)) })
},[]) //[] to call it once 

console.log(messages)
     const handleChangeM = (e) =>{
       const{target:{value}} = e
       setInput(value)
     }

     const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit('message', input,inputUser)
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
            <input id="username" type="text" name="unam" placeholder="Enter your name" onChange={handleChangeU} value={inputUser} />
            <input type="submit"  />
          </form>

          <div id="content">
            <table>
              <tr>
                <td>
               {
                  messages.map(m => <h4 key={m}>{m}</h4>)
                  }
                  </td>
                  <td>
                      {uname.map(n => <h6 key={n}>From: {n}</h6>)}
                  </td>
                  
                  
                 
              </tr>
            </table>
                 
                  </div>
      </header>
    </div>
  );
     }

    