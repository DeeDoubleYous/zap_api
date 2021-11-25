const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: __dirname + '/src/app.ts',
    output:{
        path: __dirname + '/dist',
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
    node:{
        __dirname: false
    },
    resolve:{
        extensions:['.ts', '.js']
    }
}