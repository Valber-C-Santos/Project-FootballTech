import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import  { passwordIsNotValid } from './mocks/user.mock';
import UserService from '../service/userService';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste users login', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('Se retorna erro All fields must be filled', async function() {
    const {status, body} = await chai.request(app).post('/login');
    expect(status).to.be.eq(400);
    expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
  })
  it('Retorna erro com email inválido', async function() {
    const {status, body} = await chai.request(app).post('/login').send({ email: '@xablau.com', password: 'secret_admin' });
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })
  it('Testa se retorna erro "All fields must be filled"', async function() {
    const {status, body} = await chai.request(app).post('/login').send({ email: 'admin@admin.com'})
    expect(status).to.be.eq(400)
    expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
  })
  it('Testa se retorna erro com email de formato inválido', async function() {
    const {status, body} = await chai.request(app).post('/login').send({ email: 'xablau.com', password: '12345678' });
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })
  it('Testa se retorna erro quando nao tem o token', async function() {
    const {status, body} = await chai.request(app).get('/login/role').send();
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({ message: 'Token not found' });
  })
  it('Testa se retorna erro com a senha inválida', async function() {
    const {status, body} = await chai.request(app).post('/login').send(passwordIsNotValid);
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  })
});