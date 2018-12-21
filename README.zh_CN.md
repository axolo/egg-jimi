# egg-jimi

## 安装

```bash
$ npm i @axolo/egg-jimi --save
```

## 依赖说明


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
