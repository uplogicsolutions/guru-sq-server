module.exports.handleSocket = function(io) {
  console.log('New WS connection.....');

  io.emit('message', 'Welcome new user');

  io.on('news',function(newsreel){
      socket.broadcast.emit(newsreel);
  });
}