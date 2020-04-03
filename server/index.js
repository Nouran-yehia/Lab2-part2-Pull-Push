const express = require (`express`);
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

const messages = [];

const responses = [];

app.post('/messages',(req, res)=>{
    const{body} = req;
    messages.push(body);
    res.status(204).end();
})

app.get('/messages', (req,res)=>{
    res.json(messages);
})

const subscribers = {};

app.get('/subscribers', (req,res)=>{
    const {id} = req.body;
    req.on('close', () => delete responses[id])
    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':'keep-alive',
    })
    responses[id] = res; 
})

app.post('/messageSubscribers',(req,res)=>
{
    const {body} = req;
    Object.keys(responses).forEach((subId) => {
    responses[subId].write(`data: ${JSON.stringify(body)}\n\n`);
          })
    res.status(204).end();
})

if (app.listen(3000))
console.log("listening to port 3000 \n http://localhost:3000/")