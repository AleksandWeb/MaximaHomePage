const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const date = new Date();
const time = date.getTime();

const cssLoaders = [];

const jsPath = './static/js/',
    cssPath = './static/css/';

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];

        const reg = new RegExp("\.css$");
        const cssLoader = {
            test: reg,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader:ExtractCssChunks.loader,
                    options: {
                        hot: true,
                        reloadAll: true
                    },
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                "overrideBrowserslist":['ie >= 10', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },
            ],
        };
        cssLoaders.push(cssLoader);
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
            css: `${cssPath}${name}.${time}.css`,
            js: `${jsPath}${name}.${time}.js`
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/html');


module.exports = {
    entry: {
        home: './src/js/home.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: jsPath + '[name].[hash].js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/templates'),
                use: ['raw-loader']
            },
        ].concat(cssLoaders)
    },

    plugins: [
        new ExtractCssChunks(
            {
                filename: './static/css/[name].'+time+'.css',
                chunkFilename: "[id].css",
                disable: false,
                allChunks: true,
            }
        ),
        //new CleanWebpackPlugin(),

    ].concat(htmlPlugins)
};