
const { login } = require('./auth')
const { Article, Comment } = require('./models')

exports.configureRoutes = (server) => {
  return server.route([{
    method: 'GET',
    path: '/articles',
    handler: () => {
      return Article.findAll()
    },
    config: { auth: false }
  }, {
    method: 'GET',
    path: '/articles/{id}',
    handler: async (request) => {
      const article = await Article.find(request.params.id)
      const comments = await article.getComments()

      return { ...article.get(), comments }
    },
    config: { auth: false }
  }, {
    method: 'POST',
    path: '/articles',
    handler: (request) => {
      const article = Article.build(request.payload.article)

      return article.save()
    }
  }, {
    method: ['PUT', 'PATCH'],
    path: '/articles/{id}',
    handler: async (request) => {
      const article = await Article.find(request.params.id)
      article.update(request.payload.article)

      return article.save()
    }
  }, {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: async (request) => {
      const article = await Article.find(request.params.id)

      return article.destroy()
    }
  }, {
    method: 'POST',
    path: '/articles/{id}/comments',
    handler: async (request) => {
      const article = await Article.find(request.params.id)

      return article.createComment(request.payload.comment)
    },
    config: { auth: false }
  }, {
    method: 'DELETE',
    path: '/articles/{articleId}/comments/{id}',
    handler: async (request) => {
      const { id, articleId } = request.params
      const comment = await Comment.find(id, { where: { articleId } })

      return comment.destroy()
    }
  }, {
    method: 'POST',
    path: '/authentications',
    handler: async (request) => {
      const { email, password } = request.payload.login

      return login(email, password)
    },
    config: { auth: false }
  }, {
    method: 'GET',
    path: '/',
    handler: () => {
      return require('fs').createReadStream('index.html')
    },
    config: { auth: false }
  }])
}
