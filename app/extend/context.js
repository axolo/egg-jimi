/**
 * ctx版
 * @description 此版本已被完全注释，请使用app版，原因如下：
 * 1. 依赖SESSION，默认情况下依赖浏览器，不能涵盖所有客户端，每个不同客户端均会发起对API服务器的请求
 * 2. Context插件定义属性后this指向不明，目前为带jimi前缀的驼峰命名方式，缺乏人性化和通用性
 */


// const moment = require('moment')
// const axios = require('axios')

// module.exports = {

//    /**
//      * 获取Jimi API access_token
//      * @todo 每个不同的浏览器客户端保留一份不同的SESSION，需求是服务端保留唯一一份SESSION副本
//      * @todo 非浏览器客户端缓存无效，所以，需要做的是跨客户端在服务器保留唯一一份SESSION副本
//      * @returns {Object} jimi api access_token result
//      */
//     async jimiGetAccessToken() {
//       const ctx = this
//       const app = ctx.app
//       const helper = ctx.helper
//       const config = app.config.jimi
//       let token = ctx.session.jimiAccessToken || ''
//       // 读取令牌缓存，若存在且未过期，直接从缓存返回
//       if(token && moment().format('X') - moment(token.result.time).format('X') <= parseInt(token.result.expiresIn)) {
//         ctx.logger.info('cached')
//         return token
//       }
//       // 读取配置，获取通用参数，添加私有参数
//       let params = {
//         method: 'jimi.oauth.token.get',
//         user_id: config.user_id,
//         user_pwd_md5: config.user_pwd_md5,
//         expires_in: config.expires_in
//       }
//       Object.assign(params, config.common)
//       // 获取签名（注意！！！千万不要泄露app_secret到客户端）
//       Object.assign(params, {
//         sign: helper.jimi.getSign(params, config.app_secret)
//       })
//       // 请求API
//       let res = await axios({
//         method: 'GET',
//         url: config.api,
//         params: params
//       })
//       // if(res.status !== 200) { return res }
//       // 写入令牌缓存
//       res.data.code == 0 && (ctx.session.jimiAccessToken = res.data )
//       // ctx.logger.info('request')
//       return res.data
//     },

//    /**
//     * @todo 除获取access token由服务端实现，其他功能均由客户端实现，此处仅供测试
//     * @param {*} query
//     * @returns {Array} 定位设备信息列表
//     */
//   async jimiGetTrackers(query) {
//     const ctx = this
//     const app = ctx.app
//     const helper = ctx.helper
//     const config = app.config.jimi
//     const act = await this.jimiGetAccessToken()
//     if(act.code) { return act }
//     let params = {
//       method: 'jimi.device.location.get',
//       access_token: act.result.accessToken,
//       imeis: query.imeis,
//       map_type: query.map_type || config.map_type
//     }
//     Object.assign(params, config.common)
//     Object.assign(params, { sign: helper.jimi.getSign(params, config.app_secret) })
//     let res = await axios({
//       method: 'GET',
//       url: config.api,
//       params: params
//     })
//     return res.data
//   }
// }
