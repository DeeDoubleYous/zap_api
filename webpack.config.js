const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'app.ts'),
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    externals:[nodeExternals()],
    module: {
        rules:[
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader:'ts-loader'
            }
        ]
    },
    resolve:{
        extensions:['.ts', '.js']
    }
}