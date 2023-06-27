//SSR 전용 엔트리파일(index.js 대체)
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(
  <div>This is Server-Side Rendering</div>
);

console.log(html);