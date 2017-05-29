var socket = io();

navigator.geolocation.watchPosition(function(position) {
    socket.emit('new message', 'Latitude: ' + position.coords.latitude +
        'Longitude: ' + position.coords.longitude);
});
