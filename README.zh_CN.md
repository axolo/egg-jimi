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


## 安装

```bash
$ npm i @axolo/egg-jimi --save
```

## 依赖说明

### 依赖的 egg 版本

egg-jimi 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件

- session

## 开启插件

```js
// config/plugin.js
exports.jimi = {
  enable: true,
  package: 'egg-jimi',
};
```

## 使用场景

- 获取 `jimi api` 的 `access token`，参见：http://www.jimicloud.com/apiJimi.html

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

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。


## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
