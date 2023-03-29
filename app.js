const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const update = new Event("update");

let name = "";

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('New client connected!');
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  
  ws.on('close', () => console.log('Client has disconnected!'));
});

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname + "/views");





app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.text({type: 'text/plain'}));

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('Hello! Message From Server!!')
// })

// io.on("connection", function (socket) {
//   socket.emit("sendToClient", { name });
//   socket.on("receivedFromClient", function (data) {
//     console.log(data);
//   });
// });
// io.on("/post", () =>{
//   socket.emit("sendToClient", { name });
// })

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.post('/', (req, res) => {

});

app.post('/post', (request, response) => {
  name = request.body + '5';
  // response.send(name + '5'); // 5 up to 10
  response.send('5');
  console.log(request.body);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(name);
    }
  });
});

http.listen(3000, () => {
  console.log("HTTP server started on port 3000");
})
