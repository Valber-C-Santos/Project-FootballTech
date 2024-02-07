import * as sinon from 'sinon';
import * as chai from 'chai'

// @ts-ignore

import chaiHttp = require('chai-http');
import { App } from "../app";
import Teams from '../database/models/teamsModel';
import {teamSaoPaulo, teamSP} from './mocks/teams.mock';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

  beforeEach(function() {
    sinon.restore()
  })

  it('Verifica se /teams retorna todos os times', async function() {
    sinon.stub(Teams, 'findAll').resolves(teamSP as any);
    const {status, body} = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teamSP);
  });

  it('Verifica se filtra pelo id os times na rota /teams/id', async function() {
    sinon.stub(Teams,'findByPk').resolves(teamSaoPaulo as any);
    const {status, body} = await chai.request(app).get('/teams/16');
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teamSaoPaulo);
  });

  it('Verifica se id inexistente retorna mensagem de erro e status 404 ', async function() {
    sinon.stub(Teams, 'findByPk').resolves(null);
    const {status, body} = await chai.request(app).get('/teams/190');
    expect(status).to.be.equal(404);
    expect(body).to.deep.equal({message: 'Team not found'})
  });
