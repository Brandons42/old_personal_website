var webpack = require("webpack");

module.exports = {
  context: __dirname + "/js",
  entry: {
    main: "./main.js"
  },
  module: {
    rules: [
      {
        test: __dirname + "js/main.js",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "es2015",
                {
                  modules: false
                }
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + "/js",
    filename: "bundle.js"
  }
};
