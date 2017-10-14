const path = require('path');
const webpack = require('webpack');

module.exports = {
    // devServer: {
    //     historyApiFallback: true,
    //     inline: true,
    //     contentBase: './src',
    //     port: 3000,
    // },
    // devtool: 'cheap-module-source-map',
    entry: './dev/js/index.jsx',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.js','.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'js/bundle.min.js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        })
    ],
};
