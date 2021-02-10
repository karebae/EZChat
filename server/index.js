const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ["GET", "POST"]
  },
});
const socketLogic = require('./socket/socket.js')(io);

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}\n`);
});

io.on('connect', socketLogic);

app.get('/', (req, res) => {
  res.status(200).send('Server is up and running');
});
