const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    // Assign a random guest username so no email/signup is needed
    const username = 'Guest_' + Math.floor(Math.random() * 10000);
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', { user: username, text: msg });
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
