import { createLogger, format, transports } from 'winston'

const diagnosticsFormat = format(message => ({
  ...message,
  serviceVersion: process.env.SERVICE_VERSION,
}))

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'Flashcards App' }),
    format.timestamp(),
    diagnosticsFormat(),
    format.json(),
  ),
  transports: [new transports.Console()],
})

export default logger

export const logInfo = (message, details) => {
  logger.info(message, { details })
}

export const logError = (message, details) => {
  logger.error(message, { details })
}
