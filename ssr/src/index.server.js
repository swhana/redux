//SSR 전용 엔트리파일(index.js 대체)
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import path from 'path';
import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8'));

function createPage(root) {
  return `
  <!DOCTYPE html>
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
    <script src="${manifest.files['main.js']}"></script>
  </body>
  </html>
  `
}

const app = express();

//SSR을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx); //jsx를 string 문자열로 렌더링
  res.send(createPage(root)); //렌더링한 문자열을 클라이언트에 전송(response)
}

const serve = express.static(path.resolve('./build'), {
  index: false, // '/' 경로에서 index.html을 보여주지 않도록 설정
})

app.use(serve); //반드시 serverRender 전에 serve가 위치해야함
app.use(serverRender);

app.listen(5001, () => {
  console.log('running server on localhost');
});