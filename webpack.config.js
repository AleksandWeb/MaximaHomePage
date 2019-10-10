const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const SpritesmithPlugin = require('webpack-spritesmith');

const date = new Date();
const time = date.getTime();

const cssLoaders = [];

const jsPath = './js/',
    cssPath = './css/';

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
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: '../fonts/Intro/[name].[ext]',
                }
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: '../icons/[hash].[ext]',
                    outputPath: path.resolve(__dirname, 'build/icons'),
                }
            },
        ].concat(cssLoaders)
    },

    plugins: [
        new ExtractCssChunks(
            {
                filename: './css/[name].'+time+'.css',
                chunkFilename: "[id].css",
                disable: false,
                allChunks: true,
            }
        ),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './src/fonts',
                to: './fonts'
            },
            {
                from: './src/favicons/favicon.ico',
                to: './favicons/favicon.ico'
            },
            {
                from: './src/favicons/favicon.ico',
                to: './favicons/favicon.ico'
            },
            {
                from: './src/icons/ready',
                to: './icons'
            },
        ]),
        new WebpackMd5Hash(),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/icons/ready/[hash].png'),
                css: path.resolve(__dirname, 'src/templates/sprite.less')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        }),

    ].concat(htmlPlugins)
};