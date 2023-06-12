//Ducks 패턴(action 정의, 생성함수, 리듀서 등등을 모두 한 파일에 정리하는 패턴)
//Counter.js의 리덕스 관련 코드

//action type 정의(모듈이름/액션이름)
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//액션 생성함수 정의(dispatch에서 액션을 생성하기 위해 호출할 함수)
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 0,
};

//리듀서 함수(state, action을 가지고 state를 변화시키는 함수)
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      }
    default:
      return state;
  }
}

export default counter;