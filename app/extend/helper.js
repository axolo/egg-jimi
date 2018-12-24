const _ = require('lodash')
const crypto = require('crypto')

exports.jimi = {
  /**
   * jimi api 混淆加密
   * -----------------
   * @param {*} params  jimi api 通用参数 + 请求参数
   * @param {*} secret  jimi api appSecret
   * @returns {String} jimi api sign的md5（大写）
   */
  getSign(params, secret) {
    let sign = { arr: [], str: '', md5: '' }
    _.forIn(params, (value, key) => { sign.arr.push([key , value].join('')) })
    sign.str = [secret, sign.arr.sort().join(''), secret].join('')
    sign.md5 = crypto.createHash('md5', 'utf8').update(sign.str).digest('hex').toUpperCase()
    return sign.md5
  }
}
