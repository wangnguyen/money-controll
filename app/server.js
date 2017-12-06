const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./build/webpack.config.js');

const app = express();
const compiler = webpack(config);

// compiler.run(error => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Compile Done');
//   }
// });

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/assets/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
  return true;
});
