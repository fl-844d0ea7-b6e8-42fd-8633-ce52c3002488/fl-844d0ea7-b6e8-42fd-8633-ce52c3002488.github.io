import express, { json } from 'express'
import routes from './routes'
import logger from './logging/logger'
import requestLogger from './logging/requestLogger'
import cors from 'cors'

require('@google-cloud/debug-agent').start();

const port = process.env.PORT || 8080

express()
  .use(requestLogger)
  .use(json())
  .use(cors())
  .get('/healthcheck', (_, response) => response.send())
  .use('/v1', routes)
  .get('/', (req, res) => { res.status(200).send('Hiiiiiiiiiiii')})
  .listen(port, (err) => {
    if (err) {
      logger.error(err)
      return
    }
    logger.info(`Started. Listening on port ${port}.`)
  })
