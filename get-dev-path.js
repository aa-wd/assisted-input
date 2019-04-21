const { expressPort, webpackPort, devPath } = require('./settings.json');

const getExpressPath =  () => `${devPath}:${expressPort}`;
const getWebpackPath = () => `${devPath}:${webpackPort}`;

module.exports = {
    getExpressPath,
    getWebpackPath,
};
