//SSR 전용 엔트리파일(index.js 대체)
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

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
  res.send(root); //렌더링한 문자열을 클라이언트에 전송(response)
}

app.use(serverRender);

app.listen(5001, () => {
  console.log('running server on localhost');
});