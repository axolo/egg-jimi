exports.jimi = {
  cache: "jimiAccessToken",                         // Egg.js令牌缓存键名（内存）
  api: "http://open.aichezaixian.com/route/rest",   // 几米API地址
  user_id: "",                                      // 几米API用户名，由 http://www.tuqiang123.com 提供
  user_pwd_md5: "",                                 // 几米API用户密码MD5，由 http://www.tuqiang123.com 提供
  app_key: "",                                      // 几米API开发者平台APP KEY，由开发者平台服务提供
  app_secret: "",                                   // 几米API开发者平台APP SECRET，由开发者平台服务提供
  expires_in: "7200",                               // 几米API令牌过期时间
  map_type: "GOOGLE",                               // 几米API地图坐标系编码
  format: 'json',                                   // 几米API地图格式
  sign_method: 'md5',                               // 几米API地图签名方法
  v: "1.0"                                          // 几米API版本
}
