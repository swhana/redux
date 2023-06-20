import { handleActions } from "redux-actions";
import * as api from '../lib/api';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USER';
const GET_USERS_SUCCESS = 'sample/GET_USER_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USER_FAILURE';

//thunk 함수 생성
export const getPost = (id) => async dispatch => {
  dispatch({ type: GET_POST });
  try {
    const response = await api.getPost(id);
    dispatch({ type: GET_POST_SUCCESS, payload: response.data }); //요청 성공
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: error,
      error: true,
    }); //요청 실패
    throw error;
  }
}

export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS });
  try {
    const response = api.getUsers();
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: error,
      error: true,
    });
    throw error;
  };
};

//초기 상태 선언
const initialState = {
  //로딩 중 상태
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
}

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading, //로딩 상태 얕은 복사
        GET_POST: true, //요청이 시작됐음을 알림
      }
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, //요청 완료했으니 다시 false
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, //요청 완료
      }
    }),

    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true,
      }
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      }
    })
  }
  , initialState
)

export default sample;