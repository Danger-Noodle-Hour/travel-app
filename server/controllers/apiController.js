// relevant imports here

const apiController = {};

apiController.getStateData = async (req, res, next) => {
  console.log('apiController is running')
  return next();
}

module.exports = apiController;