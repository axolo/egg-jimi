const Jimi = require('./lib/jimi')

module.exports = app => {
  app.jimi = new Jimi(app.config.jimi)
}
