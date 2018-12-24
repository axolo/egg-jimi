'use strict';
/**
 * egg-jimi default config
 * @member Config#jimi
 * @property {String} SOME_KEY - some description
 */
exports.jimi = {
  name: "egg-jimi",
  cache: "jimiAccessToken",
  api: "http://open.aichezaixian.com/route/rest",
  user_id: "",
  user_pwd_md5: "",
  app_key: "",
  app_secret: "",
  expires_in: "7200",
  map_type: "GOOGLE",
  app_key: "",
  format: 'json',
  sign_method: 'md5',
  v: "1.0"
}
