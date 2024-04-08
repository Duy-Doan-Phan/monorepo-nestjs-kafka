export const UserQueryConstants = {
  GET_USERS: {
    query: 'SELECT * FROM users'
  },
  GET_USER_BY_ID: {
    query: 'SELECT * FROM users WHERE id = $1',
    params: ['userId']
  }
}
