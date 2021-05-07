import { configureStore } from '@reduxjs/toolkit'
import { Provider, connect } from 'react-redux'
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

const usersReducerInit = {
  isIdle: true,
  isLoading: false,
  isError: false,
  error: null,
  data: [],
}
const usersReducer = (state = usersReducerInit, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isIdle: false,
        isLoading: true,
        isError: false,
      }
    case RECEIVE:
      return {
        ...state,
        isIdle: false,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case REPORT_ERROR:
      return {
        ...state,
        isIdle: false,
        isLoading: true,
        isError: true,
        error: action.payload,
      }
    default:
      return state
  }
}

const store = configureStore({
  reducer: usersReducer
})

const fetchUsers = () => (dispatch) => {
  dispatch(fetch())
  return getUsers().then((data) => {
    dispatch(receive(data))
  }).catch((err) => {
    dispatch(reportError(err))
  })
}

// Container
const UsersRedux = ({ isIdle, isLoading, isError, error, data, onFetchUsers }) => {
  return (
    <div>
      <h1>Users Redux (Global)</h1>
      <button onClick={onFetchUsers}>Filtrar</button>
      <UsersList isIdle={isIdle} isLoading={isLoading} isError={isError} error={error} data={data} />
    </div>
  )
}

const mapStateToProps = (state) => ({ ...state })

const mapDispatchToProps = (dispatch) => ({
  onFetchUsers: () => dispatch(fetchUsers())
})

const UsersReduxConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersRedux)

const UsersReduxWithProvider = () => (
  <Provider store={store}><UsersReduxConnected /></Provider>
)

export default UsersReduxWithProvider