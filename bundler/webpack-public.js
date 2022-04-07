const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = {
    entry: "./generator/homepage/index.js",
    plugins: [
        new HtmlWebpackPlugin( {
            title: "Homepage",
            filename: "index.html",
            template: "./generator/homepage/index.html",
        } ),
        new MiniCssExtractPlugin( {
            filename: "index.css",
        } ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, "css-loader" ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/i,
                type: "asset/source",
            }
        ],
    },
    output: {
        filename: "index.js",
        path: path.resolve( __dirname, "../test" ),
        clean: true,     // 清除生成目录。
        pathinfo: false, // 禁止为bundle生成模块的路径信息，以提高垃圾回收的性能，从而提高构建性能。
    },
};
