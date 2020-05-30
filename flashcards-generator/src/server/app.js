import cors from 'cors'
import { join } from 'path'
import helmet from 'helmet'
import express from 'express'
import expressStaticGzip from 'express-static-gzip'
import logger from './logging/logger'
import requestLogger from './logging/requestLogger'

const port = process.env.PORT || 8080

const production = process.env.NODE_ENV === 'production'

const app = express()
app
  .use(helmet())
  .use(requestLogger)

if (production) {
  app.use(
    '/',
    expressStaticGzip(join(__dirname, '../../client'), {
      indexFromEmptyFile: false,
      enableBrotli: true,
    }),
  )
} else {
  const devConfig = require('../../webpack.development') // eslint-disable-line global-require
  const compiler = require('webpack')(devConfig) // eslint-disable-line global-require
  const middleware = require('webpack-dev-middleware') // eslint-disable-line global-require
  app.use(middleware(compiler, {
    serverSideRender: true,
  }))
}

app
  .get('/healthcheck', (_, response) => response.send())
  .get('*', (req, res) => {
    if (production) {
      res.sendFile(join(__dirname, '../../public/index.html'))
    }
    else {
      req.url = '/' // Let the middleware handle it
      app.handle(req, res)
    }
  })
  .listen(port, (err) => {
    if (err) {
      logger.error(err)
      return
    }
    logger.info(`Started. Listening on port ${port}.`)
  })
