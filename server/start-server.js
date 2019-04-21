const express = require('express');
const cors = require('cors');
const path = require('path');

const { expressPort } = require('../settings.json');
const { getExpressPath, getWebpackPath } = require('../get-dev-path');

const isDev = process.env.NODE_ENV === 'development';
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.use('/static', express.static(path.resolve(__dirname, './static')));
app.use(cors({
  origin: getWebpackPath(),
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
app.get('*', (req, res) => res.render('index', { currentPath: getWebpackPath() }));

app.listen(expressPort, '0.0.0.0', () => console.log(`Server started on ${expressPort}!`));
