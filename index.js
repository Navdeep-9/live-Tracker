const exp = require('constants');
const express = require('express')
const http = require('http')

const Server = require('socket.io')

const app = express();
app.set('view engine','ejs')
app.use(express.static('public'))

const server = http.createServer(app)

const io = Server(server)



app.get('/',(req,res)=>{
    res.render('index')
})


// 

io.on('connection',(socket)=>{
    console.log('connceted');

    socket.on('send-location',(data)=>{

       

        io.emit('current-location',{id:socket.id, ...data})
    })

    socket.on('disconnect',()=>{
        io.emit('user-disconnect',socket.id)
    })
})

// 

server.listen(3698,()=>{
    console.log(` server running at http://localhost:3698`);
})