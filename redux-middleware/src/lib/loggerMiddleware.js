//액션이 디스패치될 때마다 액션의 정보와 전후 상태를 로깅하는 미들웨어
const loggerMiddleware = store => next => action => {
  //미들웨어 기본 
  console.group(action && action.type);
  console.log('prev state: ', store.getState());
  console.log('action: ', action);
  next(action); //다음 미들웨어 혹은 리듀서에 전달
  console.log('next state: ', store.getState());
  console.groupEnd();
};

export default loggerMiddleware;