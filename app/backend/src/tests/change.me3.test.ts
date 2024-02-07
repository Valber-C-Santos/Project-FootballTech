import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as matchesMock from './mocks/matches.mock'
import { tokenValid } from './mocks/user.mock'
import Matches from '../database/models/matchesModel';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches', function () {
  it('Deve retornar todas as partidas com requisição GET para /matches', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchesMock.matchesValids as any);

    const {status, body} = await chai.request(app).get("/matches")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchesMock.matchesValids)
  });

  it('Testa se retorna apenas as partidas em andamento', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchesMock.InProgessMatch as any);

    const {status, body} = await chai.request(app).get("/matches?inProgress=true")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchesMock.InProgessMatch)
  })

  it('Testa se retorna apenas as partidas finalizadas', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchesMock.finishMatch as any);

    const {status, body} = await chai.request(app).get("/matches?inProgress=false")

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matchesMock.finishMatch)
  })
  
  it('Testa se é possível criar uma partida com POST para /matches', async function () {
    sinon.stub(jwt, 'verify').resolves({ role: "admin"});
    const newTeam = Matches.build(matchesMock.NewTeamFromDB);
    sinon.stub(Matches, 'create').resolves(newTeam);

    const { status, body } = await chai.request(app).post("/matches")
    .set({'Authorization': `Bearer ${tokenValid}`})
    .send(matchesMock.NewMatch)

    expect(status).to.be.equal(201)
    expect(body).to.be.deep.equal(matchesMock.NewTeamFromDB)
  })

  it('erro caso não envie um token', async function () {
    const { status, body } = await chai.request(app).post("/matches")
    .send(matchesMock.NewMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token not found' })
  })

  it('Testa se retorna erro caso seja um token inválido', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai.request(app).post("/matches")
    .set({'Authorization': `Bearer any-token`})
    .send(matchesMock.NewMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  it('erro caso seja enviado um token inválido', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai.request(app).post("/matches")
    .set({'Authorization': `Bea any-token`})
    .send(matchesMock.NewMatch)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  afterEach(sinon.restore);
}) 