const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const Ably = require('ably');
const ably = new Ably.Realtime.Promise('K745cw._-4ijg:agBrhzlItDUhMfOfx3gkjF_Yqkvwy2JoOrgbi7YP5KE');
let name = "";

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname + "/views");

ably.connection.once("connected");
channel = ably.channels.get("quickstart");
channel.subscribe("greeting", (message) => {
  console.log("Message is ==> " + message.data);
});
channel.publish("greeting", "hellteteto!");

app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.text({type: 'text/plain'}));
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {

});

app.post('/post', (request, response) => {
  name = request.body + '5';
  // response.send(name + '5'); // 5 up to 10
  response.send('5');
  console.log(request.body);
  channel.publish("greeting", request.body);
});

http.listen(process.env.PORT || 3000, () => {
  console.log("HTTP server started on port 3000");
})
