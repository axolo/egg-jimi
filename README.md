# egg-jimi

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-jimi.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-jimi
[travis-image]: https://img.shields.io/travis/eggjs/egg-jimi.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-jimi
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-jimi.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-jimi?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-jimi.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-jimi
[snyk-image]: https://snyk.io/test/npm/egg-jimi/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-jimi
[download-image]: https://img.shields.io/npm/dm/egg-jimi.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-jimi

Get `jimi api` `access token`. see
[jimi api docs](http://www.jimicloud.com/apiJimi.html)

## Install

```bash
$ npm i @axolo/egg-jimi --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.jimi = {
  enable: true,
  package: 'egg-jimi',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.jimi = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// http://localhost:7001/access-token
const Controller = require('egg').Controller
class AccessTokenController extends Controller {
  async index() {
    const { app } = this
    ctx.body = await app.jimi.getAccessToken()
  }
}
module.exports = AccessTokenController
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
