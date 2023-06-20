import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({ increase, decrease, number }) => {
  return (
    <Counter onIncrease={increase} onDecrease={decrease} number={number} />
  );
};

export default connect(state =>
({
  number: state.counter
}),
  {
    increase,
    decrease,
  }
)(CounterContainer);