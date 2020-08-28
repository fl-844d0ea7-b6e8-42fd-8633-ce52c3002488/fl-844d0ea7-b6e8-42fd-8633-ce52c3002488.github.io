import { json, Router } from 'express'

import routes from './routes'

const router = Router()
    .use(json())
    .use(routes)

export default router