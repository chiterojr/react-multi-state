const UsersList = ({
  isIdle,
  isLoading,
  isError,
  error,
  data
}) => {
  if (isIdle) {
    return (<div>Pesquise por um usuários usando os filtros acima.</div>)
  }
  if (isLoading) {
    return (<div>Carregando...</div>)
  }
  if (isError) {
    return (<div>Error: {error.message}</div>)
  }

  return (
    <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>CPF</th>
        <th>Celular</th>
      </tr>
    </thead>
    <tbody>
      {data.map(user => (
        <tr key={user.taxid}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.taxid}</td>
          <td>{user.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default UsersList
