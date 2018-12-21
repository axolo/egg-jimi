'use strict';
const moment = require('moment')
/**
 * egg-jimi default config
 * @member Config#jimi
 * @property {String} SOME_KEY - some description
 */
exports.jimi = {
  name: "egg-jimi",
  cache: "jimiAccessToken",
  api: "http://open.aichezaixian.com/route/rest",
  docs: "http://www.jimicloud.com/apiJimi.html",
  user_id: "",
  user_pwd_md5: "",
  app_key: "",
  app_secret: "",
  expires_in: "7200",
  map_type: "GOOGLE",
  common: {
    app_key: "",
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    format: 'json',
    sign_method: 'md5',
    v: "1.0"
  }
}
