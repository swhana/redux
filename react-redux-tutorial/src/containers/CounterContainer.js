import { connect, useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";
import { useCallback } from "react";

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();

  //useCallback을 사용한 컴포넌트 성능 최적화
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch])


  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
}

//store안의 state를 props로 넘겨주기 위해 설정하는 함수
// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });

//store안의 action 생성 함수(dispatch)를 props로 넘겨주기 위해 설정하는 함수
// const mapDispatchToProps = (dispatch) => ({
//   increase: () => {
//     dispatch(increase());
//   },

//   decrease: () => {
//     dispatch(decrease());
//   },
// });

// connect()를 사용해서 Counter 컴포넌트를 redux와 연동
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
// export default connect(
//   state => ({
//     number: state.counter.number,
//   }),
//   {
//     increase,
//     decrease,
//   }
// )(CounterContainer);

//useSelector Hook을 사용하면 connect를 사용할 필요도 없음(store 내부 state 사용 가능)
//useDispatch Hook을 사용하면 store 내장 함수 dispatch를 사용할 수 있음
export default CounterContainer;