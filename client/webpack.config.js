'use strict';

//#region require

const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require("glob")
const HtmlWebpackPlugin = require('html-webpack-plugin');
var HappyPack = require('happypack');

var happyThreadPool = HappyPack.ThreadPool({ size: require("os").cpus().length });


//#endregion

//#region fields

var appDir = path.resolve(process.cwd(), 'app');
var nodeModPath = path.resolve(__dirname, './node_modules');

var cssLessSassExtractor = new ExtractTextPlugin('[name].css');

//#endregion

module.exports = (env) => {

    // env.dev=false;
    // env.prd=true;
    // env.demo=true;

    console.log("**********************************");
    console.log("cpus:" + require("os").cpus().length);
    console.log("appDir:" + appDir);
    console.log("nodeModPath:" + nodeModPath);

    env.dev = !!env.dev
    env.prd = !!env.prd
    env.demo = !!env.demo

    console.log("dev:" + !!env.dev);
    console.log("prd:" + !!env.prd);
    console.log("demo:" + !!env.demo);
    console.log(env);

    //#region entry

    let entry = {};
    let files =
        glob.sync("./app/entry/**/index.js");

    files.forEach(path => {

        //console.log(path);
        //let filename = /.*\/(.+?)\.js$/g.exec(path)[1];
        let dirname = /.*\/(.+?)\/.+?\.js$/g.exec(path)[1];

        entry[dirname] = [

            'babel-polyfill',
            (
                (!!env.dev) ?
                    './app/js/sys/dev_config.js' :
                    ((!!env.demo) ? './app/js/sys/demo_config.js' : './app/js/sys/prd_config.js')
            )
            ,
            path

        ]

    })

    console.log(JSON.stringify(entry, null, 1))

    //#endregion

    console.log("**********************************");

    let cfg1 = {

        entry: entry
        ,
        output: {

            path: path.join(__dirname, "app/dist"),

            filename: "[name].js",

            libraryTarget: "var",

            chunkFilename: "[name]_chunk.js",

            publicPath:'/'

        },
        cache: true
        ,

        module: {

            loaders: [{ loader: path.resolve(__dirname, './node_modules/happypack/loader.js') }],

            rules: [
                {

                    use: [
                        
                        // { loader: "HappyPack/loader?id=jsHappy" }
                        
                        {
                            loader: 'babel-loader',
                            query: {
                                plugins: ['transform-runtime'],
                                presets: ['es2015', 'stage-0'],
                                cacheDirectory: '.webpack_cache'
                            }
                          
        
                        }

                    ],

                  
    


                    exclude: function (path) {
                        // 路径中含有 node_modules 的就不去解析。
                        var isNpmModule = !!path.match(/node_modules/);
                        return isNpmModule;
                    },

                    //loader: "babel-loader",

                    // Skip any files outside of your project's `src` directory
                    include: [
                        appDir
                    ],

                    // Only run `.js` and `.jsx` files through Babel
                    test: /\.js?$/,

                    // Options to configure babel with
                    // query: {
                    //     plugins: ['transform-runtime'],
                    //     presets: ['es2015', 'stage-0'],
                    //     cacheDirectory: true
                    // },
                },
                {

                    test: /\.json$/,
                    use: [

                        {
                            loader: 'json-loader'
                        }

                    ]

                }
                ,
                {

                    test: /\.vue$/,
                    use: [

                        {
                            //loader: 'HappyPack/loader?id=vueHappy'
                            loader: 'vue-loader'
                        }

                    ]

                }
                ,
                {

                    test: /\.htm$/,
                    use: "html-loader"

                }
                ,
                {

                    test: /\.css$/,
                    use: cssLessSassExtractor.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })

                }
                ,
                {

                    test: /\.scss$/,
                    // use: cssLessSassExtractor.extract({
                    //     fallback: "style-loader",
                    //     use: ["HappyPack/loader?id=sassHappy"]
                    // })
                    use: cssLessSassExtractor.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "sass-loader"]
                    })

                }
                ,
                {

                    test: /\.less$/,
                    // use: cssLessSassExtractor.extract({
                    //     fallback: "style-loader",
                    //     use: ["HappyPack/loader?id=lessHappy"]
                    // })
                    use: cssLessSassExtractor.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })

                }
                ,
                {

                    test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                    use: [

                        {
                            loader: 'file-loader',
                            options: {
                                name: '/[name].[ext]'
                            }
                        }

                    ]

                }
                ,
                {

                    test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                    use: [

                        {
                            loader: 'url-loader',
                            options: {
                                name: '[name].[ext]?[hash]',
                                limit: 8192
                            }
                        }

                    ]

                }


            ]

        }
        ,
        externals: {
            vue: 'window.Vue',
            vueRoute:"window.VueRoute"
        },
        resolve: {

            extensions: [".js", ".css", ".less", ".scss", ".vue"],

            modules: [

                appDir,
                "node_modules",
                nodeModPath,
                //nodeModPath+'/bootstrap/js/dist'
                appDir + "/img",
                appDir + "/js"
            ],

            alias: {
                '@': path.resolve('./app'),
                happypack: path.resolve('./node_modules/happypack'),

                //vue:path.resolve(__dirname, 'app/tp/vue-esm.js')
                //'vue': 'vue/dist/vue.js',
                //'jquery':'tp/jquery.js'

            }

        },

        plugins: [

            cssLessSassExtractor,

            new webpack.optimize.CommonsChunkPlugin('common.entry'),

            new HappyPack({

                id: 'jsHappy',

                loaders: [{
                    loader: 'babel-loader',
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0'],
                    cacheDirectory: '.webpack_cache'

                }],

                threadPool: happyThreadPool,
                //verbose: true

            }),
            new HappyPack({

                id: 'sassHappy',

                loaders: ["css-loader", "sass-loader"],

                threadPool: happyThreadPool,
                //verbose: true

            }),
            new HappyPack({

                id: 'lessHappy',

                loaders: ["css-loader", "less-loader"],

                threadPool: happyThreadPool,
                //verbose: true

            }),
            new HappyPack({

                id: 'vueHappy',

                loaders: ["vue-loader"],

                threadPool: happyThreadPool,
                //verbose: true

            })


        ],

        devServer: {

            //contentBase: path.join(__dirname, "./app"),

            compress: true,

            port: 9008,

            //publicPath: "/dist/",

            inline: true,
            historyApiFallback: true,
            hot: true,
            //progress:true,
            // open: true,

            proxy: {
                "/*/*.do": {
                    target: "http://127.0.0.1:4205"
                }
            }

        }

    }

    //#region HtmlWebpackPlugin
    /*
    cfg1.plugins.push(new HtmlWebpackPlugin({

        filename: 'index.html',
        template: '!!ejs-compiled-loader!app/index.html',
        inject: false,
        env: env.dev ? 'dev' : (env.demo ? 'demo' : "prd"),
        entryName: "index",
        favicon: 'app/img/favicon.png'
    }));
    */
    let files1 = glob.sync("./app/entry/*/index.html");

    files1.forEach(path => {

        let dirname = /.*\/(.+?)\/.+?\.html$/g.exec(path)[1];
        console.log(dirname);

        cfg1.plugins.push(new HtmlWebpackPlugin({

            filename: '' + dirname + '.html',
            template: "!!ejs-compiled-loader!" + path,
            inject: false,
            env: env.dev ? 'dev' : (env.demo ? 'demo' : "prd"),
            entryName: dirname

        }));

    });

    //console.log(JSON.stringify(entry, null, 1))

    //#endregion

    //#region devtool,UglifyJSPlugin

    if (!!env.dev) {
        cfg1["devtool"] = "source-map";
    }
    else {

        cfg1["devtool"] = "source-map";

        cfg1.plugins.push(

            new UglifyJSPlugin({

                cache: true,
                //parallel: true,
                sourceMap: true,

                uglifyOptions: {

                    mangle: true,
                    ecma: 7,

                    //http://lisperator.net/uglifyjs/compress
                    compress: {
                        global_defs: {
                            DEBUG: !!env.dev
                        },
                        drop_debugger: true
                    }

                }

            })

        )

    }

    //#endregion

    return cfg1;

}

