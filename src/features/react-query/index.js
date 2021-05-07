import {
  useQuery,
  // useQueryClient,
} from 'react-query'
import UsersList from '../../components/UsersList'
import getUsers from '../../data'

// Container
const UsersReactQuery = () => {
  const users = useQuery('users', getUsers, { enabled: false })
  const { refetch } = users

  return (
    <div>
      <h1>Users React Query (Hook)</h1>
      <button onClick={() => refetch()}>Filtrar</button>
      <UsersList {...users} />
    </div>
  )
}

export default UsersReactQuery