const path = require("path")
const nodeExternals = require("webpack-node-externals")
const { merge } = require("webpack-merge")
const config = require("./webpack.base")

const serverConfig = {
  target: "node", // webpack识别为服务器端代码（打包时有所不同）
  mode: "development",
  entry: "./src/server/index.js",
  output: {
    filename: "bundle.js",
    path: path .resolve(__dirname,"..", "build")
  },
  externals: [nodeExternals()],
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ["isomorphic-style-loader", {
          loader: "css-loader",
          options: {
            // 注意这个bug: https://github.com/kriasoft/isomorphic-style-loader/issues/201
            esModule: false,
            importLoaders: 1,
            modules: {
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          }}]
      }
    ]
  }
}

module.exports = merge(config, serverConfig)