var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

//export config object
module.exports = {
    //Start looking for files in our main js file, and fill in gaps using babel fill ins (polyfills)
    entry: [ "main.js", "babel-polyfill"],
    output: {
        //Output bundle to ./public/javascripts/bundle.js
        path: path.resolve(__dirname, "./public/javascripts"),
        filename: "bundle.js",
        //The location on the public path of your bundle file
        publicPath: "/javascripts"
    },

    module: {
        loaders: [
            //Babel javascript loader, convert jsx or js files to es5 javascript
            {
                //only test js and jsx files
                test: [/\.js$/, /\.jsx$/],
                //only include files in the client directory (so we don't compile our node modules or server side code)
                include: path.resolve(__dirname, "client"),
                loader: 'babel-loader',
                query: {
                    //use es6 and or jsx syntax
                    presets: ['react', 'es2015'],
                    // makes output more concise
                    plugins: ['transform-runtime'],
                }
            },

          //CSS loader: Allows you to import CSS files. This version runs postcss to add vendor prefixes. We also run the extract text plugin to bundle the css into its own single file
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss')
            },

            //Loader for .png and .jpg files
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=./public/images/[hash].[ext]'
            }
        ]
    },

    // Set where we are going to extract the css bundle
    plugins: [
        new ExtractTextPlugin("./public/stylesheets/styles.css"),
    ],

    resolve: {
        root: path.join(__dirname, ''),
        // look for modules in node_modules and the client directory for imports
        modulesDirectories: [
          'node_modules',
          'client'
        ],
        // resolve below file types
        extensions: ['', '.js', '.jsx', 'css']
    },

    // configure the postcss loader to user autoprefixer
    postcss: [ autoprefixer({ browsers:['last 2 versions'] }) ]
    }
