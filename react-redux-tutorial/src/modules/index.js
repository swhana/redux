//store가 하나밖에 사용할 수 없기 때문에 reducer도 하나로 통합해서 사용해야한다. 이를 위한 root reducer
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;