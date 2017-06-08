module.exports = (application) => {
  const controller = require('../controllers/chat')(application);

  application.route('/chat')
    .get((req, res) => {
      controller.iniciaChat(req, res);
    })
    .post((req, res) => {
      controller.iniciaChat(req, res);
    });
};
