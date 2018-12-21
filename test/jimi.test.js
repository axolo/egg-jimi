'use strict';

const mock = require('egg-mock');

describe('test/jimi.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/jimi-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, jimi')
      .expect(200);
  });
});
