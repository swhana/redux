const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: 'production', //production mode로 최적화 옵션 활성화
  entry: paths.ssrIndexJs, //엔트리 경로
  target: 'node', //node 환경에서 실행
  output: {
    path: paths.ssrBuild, //빌드 경로
    filename: 'server.js', //파일 이름
    chunkFilename: 'js/[name].chunk.js', //청크 파일 이름
    publicPath: paths.publicUrlOrPath, //정적 파일이 제공될 경로
  },
  module: {
    rules: [
      {
        oneOf: [
          //자바스크립트를 위한 처리
          //기존 webpack.config.js를 바탕으로 작성
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    runtime: 'automatic',
                  },
                ],
              ],
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          //css 처리
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
          //CSS Module 처리
          {
            test: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          //Sass 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                  },
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          //sass + css module 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          //url-loader 설정
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('resolve-url-loader'),
            options: {
              emitFile: false, //파일을 따로 저장하지 않음
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          //이외 파일 처리
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false,
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  //node_modules 내부 라이브러리를 불러올 수 있도록 함
  resolve: {
    modules: ['node_modules'],
  },
  externals: [
    nodeExternals({
      allowlist: [/@babel/],
    })
  ],
  //env 환경변수 주입
  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ]
}

