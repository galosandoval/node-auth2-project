module.exports = (users) => {
  return Boolean(users.username && users.password && users.department)
}