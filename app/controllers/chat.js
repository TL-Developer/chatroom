module.exports = (application) => {
  const controller = {};

  controller.iniciaChat  = (req, res) => {
    let dadosForm = req.body;

    req.assert('apelido','Nome ou apelido é obrigatŕoio').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3,15);

    let erros = req.validationErrors();

    if(erros) {
      res.render('index', {validacao: erros})
      return;
    }

    let date = new Date();
    let minuto = date.getMinutes() < '10' ? '0' + date.getMinutes() : date.getMinutes();
    let h = date.getHours() < '10' ? '0' + date.getHours() : date.getHours();
    let hora = h + ':' + minuto;

    application.get('io').emit('msgParaCliente', {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat', hora: hora});
    application.get('io').emit('participantesParaCliente', {apelido: dadosForm.apelido});

    res.render('chat', {dadosForm: dadosForm});
  };

  return controller;
};
