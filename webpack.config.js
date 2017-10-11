const JavaScriptObfuscator = require('webpack-obfuscator');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: `${__dirname}`,

    entry: {
        'dist/popup.js': './src/popup/index.js',
        'dist/background.js': './src/background/index.js',
    },

    output: {
        path: `${__dirname}`,
        filename: '[name]'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
        ]
    },

    plugins: [
        new JavaScriptObfuscator({
            rotateUnicodeArray: true,
            rotateStringArray: true,
            compact: true,
            controlFlowFlattening: true
        }, []),
        new CopyWebpackPlugin([
            { from: './src/index.html', to: './dist/index.html' },
        ])
    ]
};
