import {rest} from 'msw'
import {offersList, CV} from 'App/utils/mockData.js'

const handlers = [
  rest.post('/devs', async (req, res, ctx) => {
    return res(ctx.text("4325325325235"))
  }),
  rest.post('/devs/signup', async (req, res, ctx) => {
    return res(ctx.text("4325325325235"))
  }),
  rest.get('/', async (req, res, ctx) => {
    return res(ctx.json(offersList))
  }),
  rest.get('/cv/get', async (req, res, ctx) => {
    return res(ctx.json(CV))
  })
]

export {handlers}
