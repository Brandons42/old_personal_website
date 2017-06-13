var webpack = require("webpack");

module.exports = {
  entry: {
    main: "./js/main.js"
  },
  module: {
    rules: [
      {
        test: __dirname + "js/main.js"
      }
    ]
  },
  output: {
    path: __dirname + "/js",
    filename: "bundle.js"
  }
};
