//Ducks패턴
//Todos.js의 리덕스 관련 코드
import { createAction, handleActions } from "redux-actions";

//action type
const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

//action 생성 함수
// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input
// });
export const changeInput = createAction(CHANGE_INPUT, input => input);


let id = 3; //사전에 todo list 2개를 넣어두기 때문에 3부터 시작
// export const insert = (text) => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false
//   }
// });
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false
}))

// export const toggle = (id) => ({
//   type: TOGGLE,
//   id
// })
export const toggle = createAction(TOGGLE, id => id);

// export const remove = (id) => ({
//   type: REMOVE,
//   id
// })
export const remove = createAction(REMOVE, id => id);

//초기상태
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ]
}


//리듀서 함수
//상태의 불변성을 유지하도록 상태값을 shallow copy한 후에 덮어씌운 값을 반환
//concat, map, filter 등의 함수는 기존 배열을 복사해서 변환한 객체를 반환한다
// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };

//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo),
//       };

//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.id ?
//             {
//               ...todo,
//               done: !todo.done
//             } : todo)
//       };

//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.id)
//       };

//     default:
//       return state;
//   }
// }
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
    [INSERT]: (state, action) => ({ ...state, todos: state.todos.concat(action.payload) }),
    [TOGGLE]: (state, action) => ({ ...state, todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, done: !todo.done } : todo) }),
    [REMOVE]: (state, action) => ({ ...state, todos: state.todos.filter(todo => todo.id !== action.payload) })
  }, initialState
)

export default todos;