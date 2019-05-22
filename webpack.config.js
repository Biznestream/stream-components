const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ReplacePlugin = require('webpack-plugin-replace');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const version = process.env.VERSION || require('./package.json').version;

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './src/index.js',
    target: "web",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: "commonjs2",
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "plugins": [
                            ["@babel/proposal-decorators", {"legacy": true}],
                            ["@babel/proposal-class-properties", {"loose": true}]
                        ]
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loaders: ['vue-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new ReplacePlugin({
            exclude: [
                /node_modules/
            ],
            values: {
                '__VERSION__': version,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],

    resolve: {
        extensions: ['.js', '.vue'],
    },

    externals: {
        vue: 'vue',
        vuex: 'vuex',
        'vue-class-component': 'vue-class-component',
    },
};