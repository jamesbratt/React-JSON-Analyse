const path = require('path');

module.exports = {
    entry: './src/JsonAnalyse.js',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {          
        react: {          
            commonjs: 'react',          
            commonjs2: 'react',          
            amd: 'React',          
            root: 'React',      
        },      
        'react-dom': {          
            commonjs: 'react-dom',          
            commonjs2: 'react-dom',          
            amd: 'ReactDOM',          
            root: 'ReactDOM',      
        },  
    }, 
};