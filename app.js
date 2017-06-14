const socket = require('socket.io');
const app = require('./config/server')();

const server = app.listen(process.env.PORT || 8001, () => {
  console.log('Server online');
});

const io = socket.listen(server);

app.set('io', io);


io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('disconnect', (data) => {
    console.log('Usuário desconectou');
  });

  socket.on('msgParaServidor', (data) => {
    socket.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem,
      cor: 'minhaMensagem',
      hora: data.hora
    });

     socket.broadcast.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem,
      cor: 'mensagemEnviada',
      hora: data.hora
    });

     socket.broadcast.emit('usuarioDigitando', {
        digitando: data.digitando,
        apelido: data.apelido
     });
  });
});
