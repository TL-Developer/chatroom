module.exports = () => {
  const controller = {};

  controller.home = (req, res) => {
    res.render('index', {validacao: {}});
  };

  return controller;
};
