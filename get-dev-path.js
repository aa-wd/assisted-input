const { expressPort, webpackPort, devPath, productionPath, isOnVps } = require('./settings.json');

const getExpressPath =  () => isOnVps ? productionPath : `${devPath}:${expressPort}`;
const getWebpackPath = () => `${devPath}:${webpackPort}`;

module.exports = {
    getExpressPath,
    getWebpackPath,
};
