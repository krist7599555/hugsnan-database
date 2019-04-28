import Router from 'koa-router'

const router = new Router()

router
  .prefix('/user')
  .get('/', ctx => ctx.ok('API /user endpoint'))
  .post('/create', ctx => {
    ctx.db.collection('users').insertOne(ctx.request.body)
    ctx.body = []
  })
  .get('/all', async (ctx, next) => {
    ctx.body = await ctx.db
      .collection('users')
      .find()
      .toArray()
  })
  .get('/:id', (ctx, next) => {
    ctx.body = ctx.body[+ctx.params.id]
    next()
  })

export default router
