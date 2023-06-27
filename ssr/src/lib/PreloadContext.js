import { createContext, useContext } from "react";

//클라이언트 환경: null
//서버 환경: { done: false, promises:[] }
const PreloadContext = createContext(null);
export default PreloadContext;

export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null; //context값이 유효하지 않은 경우
  if (preloadContext.done) return null; //작업이 이미 끝난 상태인 경우

  //promises 배열에 프로미스 등록
  //reslove 함수가 프로미스를 반환하지 않아도 프로미스 취급을 하기 위함
  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
}