// import { configureStore, createSlice } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'
import UsersList from '../../components/UsersList'
import getUsers from '../../data'

const FETCH = 'FETCH'
const RECEIVE = 'RECEIVE'
const REPORT_ERROR = 'REPORT_ERROR'

const fetch = () => ({
  type: FETCH
})

const receive = (payload) => ({
  type: RECEIVE,
  payload
})

const reportError = (payload) => ({
  type: REPORT_ERROR,
  payload
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isIdle: true,
    isLoading: false,
    isError: false,
    error: null,
    data: [],
  },
  reducers: {
    fetch(state) {
      state.isIdle = false
      state.isLoading = true
      state.error = false
    },
    receive(state, action) {
      state.isIdle = false
      state.isLoading = false
      state.error = false
      state.data = action.payload
    },
    reportError(state, action) {
      state.isError = true
      state.isIdle = false
      state.isLoading = false
      state.error = action.payload
    }
  },
})

function* fetchUsers(action) {
  try {
    const data = yield call(getUsers);
    yield put(receive(data));
  } catch (err) {
    yield put(reportError(err));
  }
}

function* usersSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(usersSaga)

const fetchUsers = () => (dispatch) => {
  dispatch(fetch())
  return getUsers().then((data) => {
    dispatch(receive(data))
  }).catch((err) => {
    dispatch(reportError(err))
  })
}

// Container
const UsersReduxToolkit = () => {
  const users = useSelector(state => state);
  const dispatch = useDispatch();
  const { isIdle, isLoading, isError, error, data } = users

  return (
    <div>
      <h1>Users Redux Toolkit (Global)</h1>
      <button onClick={() => dispatch(fetchUsers())}>Filtrar</button>
      <UsersList isIdle={isIdle} isLoading={isLoading} isError={isError} error={error} data={data} />
    </div>
  )
}

const UsersReduxToolkitWithProvider = () => (
  <Provider store={store}><UsersReduxToolkit /></Provider>
)

export default UsersReduxToolkitWithProvider