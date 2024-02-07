import { expect } from 'chai';
import mapStatusHTTP from '../ultis/mapStatusHTTP'; // Substitua com o caminho correto para o módulo mapStatusHTTP

describe('mapStatusHTTP', () => {
  it('map status HTTP ', () => {
    const SUCCESSFUL = 'SUCCESSFUL';
    const INVALID_DATA = 'INVALID_DATA';
    const NOT_FOUND = 'NOT_FOUND';
    const CONFLICT = 'CONFLICT';
    const UNAUTHORIZED = 'UNAUTHORIZED';
    const CREATED = 'CREATED';
    const UNKNOWN_STATUS = 'UNKNOWN_STATUS';

    expect(mapStatusHTTP(SUCCESSFUL)).to.equal(200);
    expect(mapStatusHTTP(INVALID_DATA)).to.equal(400);
    expect(mapStatusHTTP(NOT_FOUND)).to.equal(404);
    expect(mapStatusHTTP(CONFLICT)).to.equal(409);
    expect(mapStatusHTTP(UNAUTHORIZED)).to.equal(401);
    expect(mapStatusHTTP(CREATED)).to.equal(201);
    expect(mapStatusHTTP(UNKNOWN_STATUS)).to.equal(500);
  });
});