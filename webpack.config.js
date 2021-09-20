const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = { 
    plugins: [
        new HtmlWebpackPlugin()
    ], 
    watch : true , 
    compress : false
}