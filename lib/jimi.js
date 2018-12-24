const moment = require('moment')
const axios = require('axios')
const NodeCache = require('node-cache')
const helper = require('../app/extend/helper')
const cache = new NodeCache()

module.exports = app => {

  app.jimi = {
    /**
     * 获取Jimi API AccessToken
     * -------------------------
     * @description
     * 涉及app_secret，获取必须从服务端推送到客户端
     * 而且，绝大多少有获取频次限制，需要服务端缓存机制
     * 1. 服务器为所有客户端缓一份未过期的access_token副本
     * 2. 如缓存过期则重新向API申请新的access_token并缓存
     * @see http://www.jimicloud.com/apiJimi.html#obtain
     * @returns {Object} Jimi API AccessToken
     */
    async getAccessToken() {
      const config = app.config.jimi
      // 读取令牌缓存，若存在且未过期，直接从缓存返回，否则请求API服务器
      let token = cache.get(config.cache) || ''
      if(token) { return token }
      // 读取配置，获取通用参数，添加私有参数
      let params = {
        method: 'jimi.oauth.token.get',
        app_key: config.app_key,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        format: config.format,
        sign_method: config.sign_method,
        v: config.v,
        // 以下为私有参数
        user_id: config.user_id,
        user_pwd_md5: config.user_pwd_md5,
        expires_in: config.expires_in
      }
      // 获取签名（注意！！！千万不要泄露app_secret到客户端）
      Object.assign(params, {
        sign: helper.jimi.getSign(params, config.app_secret)
      })
      // 请求API
      let res = await axios({
        method: 'GET',
        url: config.api,
        params: params
      })
      // 正确，令牌写入缓存，否则不写入
      res.data.code == 0 && (cache.set(config.cache, res.data, parseInt(res.data.result.expiresIn)))
      return res.data
    },

    /**
     * 获取追踪器详情列表
     * ------------------
     * @todo 其实除了获取access token必须由服务端实现，其他功能应该均由客户端实现，此例仅供测试
     * @see http://www.jimicloud.com/apiJimi.html#getdata
     * @param {*} query 追踪器IMEI列表，以逗号隔开
     * @returns {Object} 追踪器详情列表（数组）
     */
    async getTrackers(query) {
      const config = app.config.jimi
      const act = await this.getAccessToken()
      if(act.code) { return act }
      let params = {
        method: 'jimi.device.location.get',
        app_key: config.app_key,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        format: config.format,
        sign_method: config.sign_method,
        v: config.v,
        // 以下为私有参数
        access_token: act.result.accessToken,
        imeis: query.imeis,
        map_type: query.map_type || config.map_type
      }
      Object.assign(params, { sign: helper.jimi.getSign(params, config.app_secret) })
      let res = await axios({
        method: 'GET',
        url: config.api,
        params: params
      })
      return res.data
    }
  }
}
