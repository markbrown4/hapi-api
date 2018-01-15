
const path = require('path')
const Sequelize = require('sequelize')
const Boom = require('boom')

Sequelize.Model.find = async function (...args) {
  const obj = await this.findById(...args)
  if (obj === null) throw Boom.notFound()

  return obj
}

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: path.join('tmp', 'db.sqlite')
})

const Article = sequelize.define('article', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

const Comment = sequelize.define('comment', {
  commenter: Sequelize.STRING,
  body: Sequelize.TEXT
})

Article.hasMany(Comment)
Comment.belongsTo(Article)

Article.sync()
Comment.sync()

module.exports = {
  Article,
  Comment
}
