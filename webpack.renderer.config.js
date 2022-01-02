const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
rules.push({
  test: /\.(png|jpg|gif)$/,
  use: [{loader: 'file-loader'}],
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};