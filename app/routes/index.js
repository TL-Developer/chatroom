module.exports = (application) => {
  const controller = require('../controllers/index')();

  application.route('/')
    .get(controller.home);

};
