import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return <Counter number={number} onIncrease={increase} onDecrease={decrease} />;
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
export default connect(
  state => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease,
  }
)(CounterContainer);