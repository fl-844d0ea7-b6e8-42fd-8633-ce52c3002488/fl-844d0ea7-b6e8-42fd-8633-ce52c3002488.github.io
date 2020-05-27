import { Pool } from 'pg'
import { logInfo, logError } from '../logging/logger'

const connectionString = process.env.DB_CONNECTION

const postgresPool = new Pool({
    connectionString,
    connectionTimeoutMillis: 10000,
})

export const getFlashcardByName = async ( name ) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'SELECT COUNT(*) FROM flashcards_app.flashcards WHERE name=$1',
                values: [name]
            }

            logInfo("Performing query", query.text)
            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError(queryError.stack)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                logInfo("Received result", {count: result.rows})
                resolve(result.rows[0].count)
            })
        })
    }
)

export const getTopicCountByName = async ( name ) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'SELECT COUNT(*) FROM flashcards_app.topics WHERE name=$1',
                values: [name]
            }

            logInfo("Performing query", query.text)
            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError(queryError.stack)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                logInfo("Received result", {count: result.rows})
                resolve(result.rows[0].count)
            })
        })
    }
)

export const insertTopic = async (name, colour) => new Promise(
    (resolve, reject) => {
        logInfo("Connecting to database to insert topic")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            logInfo("Connected to Data successfully")

            const query = {
                text: 'INSERT INTO flashcards_app.topics(name, colour, created, updated) VALUES($1, $2, NOW(), NOW())',
                values: [name, colour]
            }

            logInfo(`Making query ${query.text}`)

            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError(queryError)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                logInfo(`Received result: ${result.rowCount}`)
                resolve(result.rowCount)
            })
        })
    }
)

export const removeTopic = async (id) => new Promise(
    (resolve, reject) => {
        logInfo("Connecting to database to delete topic")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'DELETE FROM flashcards_app.topics where topic_id = $1',
                values: [id]
            }

            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError(queryError.stack)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                resolve(result)
            })
        })
    }
)
