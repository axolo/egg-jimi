const _ = require('lodash')
const crypto = require('crypto')
const moment = require('moment')
const axios = require('axios')
const NodeCache = require('node-cache')
const cache = new NodeCache()

class Jimi {

  /**
   * **Jimi API**
   *
   * @see http://www.jimicloud.com/apiJimi.html
   * @param {Object} config 几米API配置，配置说明如下
   *
   * ```js
   * {
   *   cache: "jimiAccessToken",                         // Egg.js令牌缓存键名（内存）
   *   api: "http://open.aichezaixian.com/route/rest",   // 几米API地址
   *   user_id: "",                                      // 几米API用户名，由 http://www.tuqiang123.com 提供
   *   user_pwd_md5: "",                                 // 几米API用户密码MD5，由 http://www.tuqiang123.com 提供
   *   app_key: "",                                      // 几米API开发者平台APP KEY，由开发者平台服务提供
   *   app_secret: "",                                   // 几米API开发者平台APP SECRET，由开发者平台服务提供
   *   expires_in: "7200",                               // 几米API令牌过期时间
   *   map_type: "GOOGLE",                               // 几米API地图坐标系编码
   *   format: 'json',                                   // 几米API地图格式
   *   sign_method: 'md5',                               // 几米API地图签名方法
   *   v: "1.0"                                          // 几米API版本
   * }
   * ```
   */
  constructor(config) {
    this.config = config
  }

  /**
   * **获取 Jimi API AccessToken**
   *
   * `app_secret`不能暴露到客户端，服务端需建立第三方`access_token`的缓存机制。
   *
   * 1. 服务器为所有客户端缓一份未过期的`access_token`副本
   * 2. 如缓存过期则重新向API申请新的`access_token`并缓存
   *
   * @see http://www.jimicloud.com/apiJimi.html#obtain
   * @return {Object} Jimi API AccessToken
   * @memberof Jimi
   */
  async getToken() {
    const config = this.config
    // 读取令牌缓存，若存在且未过期，直接从缓存返回，否则请求API服务器
    const token = cache.get(config.cache) || ''
    if(token) { return token }
    // 读取配置，获取通用参数，添加私有参数
    const params = {
      // 通用参数
      method: 'jimi.oauth.token.get',
      app_key: config.app_key,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      format: config.format,
      sign_method: config.sign_method,
      v: config.v,
      // 私有参数
      user_id: config.user_id,
      user_pwd_md5: config.user_pwd_md5,
      expires_in: config.expires_in
    }
    // 获取签名（注意！！！千万不要泄露app_secret到客户端）
    Object.assign(params, { sign: this.getSign(params, config.app_secret) })
    // 请求API
    const res = await axios({ method: 'GET', url: config.api, params: params })
    // 正确，令牌写入缓存，否则不写入
    res.data.code === 0 && (cache.set(config.cache, res.data, parseInt(res.data.result.expiresIn)))
    return res.data
  }

  /**
   * **获取 Jimi API 签名**
   *
   * @see http://www.jimicloud.com/apiJimi.html#autograph
   * @param {Object} params  jimi api 通用参数 + 请求参数
   * @param {String} secret  jimi api appSecret
   * @return {String} jimi api sign的md5（大写）
   * @memberof Jimi
   */
  getSign(params, secret) {
    const sign = { arr: [], str: '', md5: '' }
    _.forIn(params, (value, key) => { sign.arr.push([key, value].join('')) })
    sign.str = [secret, sign.arr.sort().join(''), secret].join('')
    sign.md5 = crypto.createHash('md5').update(sign.str, 'utf8').digest('hex')
    sign.md5 = sign.md5.toUpperCase()   // 几米API的MD5是大写的！！！
    return sign.md5
  }

  /**
     * **获取追踪器详情列表**
     *
     * **WARNING**：仅供测试
     *
     * 除`access_token`涉及到私钥必须由服务端实现，其他功能应该均由客户端实现。
     *
     * @see http://www.jimicloud.com/apiJimi.html#getdata
     * @param {String} trackers 追踪器IMEI列表，以逗号隔开
     * @return {Object} 追踪器详情列表（数组）
     * @memberof Jimi
     */
  async getTracker(trackers) {
    const config = this.config
    const token = await this.getToken()
    if(token.code) { return token }
    const params = {
      method: 'jimi.device.location.get',
      app_key: config.app_key,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      format: config.format,
      sign_method: config.sign_method,
      v: config.v,
      // 以下为私有参数
      access_token: token.result.accessToken,
      imeis: trackers.imeis,
      map_type: trackers.map_type || config.map_type
    }
    Object.assign(params, { sign: this.getSign(params, config.app_secret) })
    const res = await axios({ method: 'GET', url: config.api, params: params })
    return res.data
  }

}

module.exports = Jimi
