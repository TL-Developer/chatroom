const socket = require('socket.io');
const app = require('./config/server')();

const server = app.listen(process.env.PORT || 8001, () => {
  console.log('Server online');
});

const io = socket.listen(server);

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('disconnect', () => {
    console.log('Usuário desconectou')
  });

  socket.on('msgParaServidor', (data) => {
    socket.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

     socket.broadcast.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

     if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
       socket.emit('participantesParaCliente', {
        apelido: data.apelido
      });

       socket.broadcast.emit('participantesParaCliente', {
        apelido: data.apelido
      });
     }
  });
});
