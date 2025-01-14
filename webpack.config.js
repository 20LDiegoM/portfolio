const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        custom: "./src/js/main.js",
        vendor: "./src/js/vendor.js",
    },
    output: {
        filename: "[name].bundle.js", // Genera app.bundle.js y vendor.bundle.js
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // Procesa archivos SCSS
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                quietDeps: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/, // Procesa archivos CSS
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.js$/, // Procesa archivos JS
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/images"), // Carpeta de origen
                    to: "images", // Carpeta de destino dentro de dist
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devServer: {
        static: {
            directory: __dirname,
        },
        compress: true,
        port: 8082,
        open: true,
        hot: false,
        devMiddleware: {
            writeToDisk: true,
        },
    },
};
