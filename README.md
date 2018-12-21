# egg-jimi

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
