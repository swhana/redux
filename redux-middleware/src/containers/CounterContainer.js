import { connect } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({ increaseAsync, decreaseAsync, number }) => {
  return (
    <Counter
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
      number={number}
    />
  );
};

export default connect(state =>
({
  number: state.counter
}),
  {
    increaseAsync,
    decreaseAsync,
  }
)(CounterContainer);