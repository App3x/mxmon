const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Datastore = require('@google-cloud/datastore');

const port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/assets'));

// Instantiates a client
const datastore = Datastore({
  projectId: 'mx-mon'
});

// Prepares the new entity
const task = {
  key: datastore.key(['Task', 'sampletask1']),
  data: {
    description: 'Buy milk'
  }
};

datastore.save(task)
  .then(() => {
    console.log(`Saved ${task.key.name}: ${task.data.description}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

io.on('connection', function(socket) {
    socket.on('new message', function(data) {
        console.log(data);

    });

    socket.on('disconnect', function() {

    });
});
