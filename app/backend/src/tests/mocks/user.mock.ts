const userIsNotValid = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const emailIsNotValid = {
  email: 'xablau@xablau.com',
  password: 'secret_admin'
}

const passwordIsNotValid = {
  email: 'admin@admin.com',
  password: '123456'
}

const validLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const tokenValid = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA3MjQ3NzM1LCJleHAiOjE3MDc4NTI1MzV9.4YGpnMQjHbZSTXl43Trs_4rVViUMNzFWCxh6r8vhO6E"
}
  export { userIsNotValid, emailIsNotValid, passwordIsNotValid, validLogin, tokenValid };