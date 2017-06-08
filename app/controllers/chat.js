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

    application.get('io').emit('msgParaCliente', {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'});
    application.get('io').broadcast.emit('msgParaCliente', {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat'});

    res.render('chat', {dadosForm: dadosForm});
  };

  return controller;
};
