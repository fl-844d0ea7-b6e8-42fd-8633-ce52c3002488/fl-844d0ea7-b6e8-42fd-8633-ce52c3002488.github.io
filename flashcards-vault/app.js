import express, { json } from 'express'
import routes from './routes'
import logger from './logging/logger'
import requestLogger from './logging/requestLogger'

const port = 4000

express()
  .use(requestLogger)
  .use(json())
  .get('/healthcheck', (_, response) => response.send())
  .use('/v1', routes)
  .listen(port, '0.0.0.0', (err) => {
    if (err) {
      logger.error(err)
      return
    }
    logger.info(`Started. Listening on port ${port}.`)
  })
