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
  
  export { userIsNotValid, emailIsNotValid, passwordIsNotValid, validLogin};