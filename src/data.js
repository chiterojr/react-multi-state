const data = [
  { name: 'John Doe', email: 'john@doe.com', taxid: '782.567.182-11', phone: '(16) 91234 5678' },
  { name: 'Jane Doe', email: 'jane@doe.com', taxid: '342.523.162-52', phone: '(16) 91234 8765' },
]

const getUsers = () => {
  console.log('getUsers')
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 3000)
  })
}

export default getUsers