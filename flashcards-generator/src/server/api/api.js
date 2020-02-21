import cors from 'cors'
import { json, Router } from 'express'

import routes from './routes'

const router = Router()
    .use(cors())
    .use(json())
    .use(routes)

export default router