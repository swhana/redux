//SSR 전용 엔트리파일(index.js 대체)
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import path from 'path';
import fs from 'fs';
import { legacy_createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import PreloadContext from './lib/PreloadContext';

const manifest = JSON.parse(fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8'));

function createPage(root, stateScript) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
        <meta name="theme-color" content="#000000"/>
        <title>React App</title>
        <link href="${manifest.files['main.css']}" rel="stylesheet"/>
      </head>
      <body>
        <div id="root">${root}</div>
        ${stateScript}
        <script src="${manifest.files['main.js']}"></script>
      </body>
    </html>
  `
}

const app = express();

//SSR을 처리할 핸들러 함수
const serverRender = async (req, res, next) => {
  const context = {};
  const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

  const preloadContext = {
    done: false,
    promises: [],
  };

  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );

  //정적인 페이지를 렌더링할 때 renderToStaticMarkUp 사용, renderToString보다 속도가 빠름
  ReactDOMServer.renderToStaticMarkup(jsx); //renderToStaticMarkUp으로 렌더링

  try {
    await Promise.all(preloadContext.promises); //모든 프로미스를 수집(API 요청으로 사전에 데이터를 받아옴)
  } catch (error) {
    return res.status(500); //Internal Server Error
  }
  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx); //jsx를 string 문자열로 렌더링
  //redux initialState를 스크립트로 html에 주입
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

  res.send(createPage(root, stateScript)); //렌더링한 문자열을 클라이언트에 전송(response)
}

const serve = express.static(path.resolve('./build'), {
  index: false, // '/' 경로에서 index.html을 보여주지 않도록 설정
})

app.use(serve); //반드시 serverRender 전에 serve가 위치해야함
app.use(serverRender);

app.listen(5001, () => {
  console.log('running server on localhost');
});