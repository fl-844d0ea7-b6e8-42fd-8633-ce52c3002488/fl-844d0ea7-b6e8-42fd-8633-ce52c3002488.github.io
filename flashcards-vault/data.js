import { Pool } from 'pg'
import { logInfo, logError } from './logging/logger'

const postgresPool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'testpassword',
    database: 'postgres'
})

export const insertFlashcard = async (data, topic, name) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'INSERT INTO flashcards(data, topic, name, created, updated) VALUES($1, $2, $3, NOW(), NOW())',
                values: [data, topic, name]
            }

            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    reject(new Error("Postgres sadness :("))
                    return
                }
                resolve(result.rowCount)
            })
        })
    }
)

export const removeFlashcard = async (id) => new Promise(
    (resolve, reject) => {
        logInfo("Connecting to database to delete flashcard")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'DELETE FROM flashcards where id = $1',
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

export const getFlashcards = async (searchTerms) => new Promise(
    (resolve, reject) => {
        logInfo("Received request to get flashcards")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'SELECT id, data from flashcards',
                values: []
            }

            logInfo("Building query")

            Object.entries(searchTerms).some(([key, value], index) => {
                logInfo("Concatenating items to search", {key, value, index})
                logInfo(index == 0)
                if (index == 0 || query.values.length == 0) {
                    if (value === ""){
                        logInfo(`${key} has value: ${value} - skipping`)
                        return false
                    }
                    query.text += ` WHERE ${key} LIKE $1`
                    query.values.push(`%${value}%`)
                }
                else {
                    if (value === ""){
                        logInfo(`${key} has value: ${value} - skipping`)
                        return false
                    }
                    query.text += `AND ${key} LIKE $${index}`
                    query.values.push(`%${value}%`)
                }
            })

            logInfo(query)

            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError('Error occurred', queryError.stack)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                logInfo("Received successfuly result", {result} )
                resolve(result.rows)
            })
        })
    }
)


export const updateFlashcardDefinition = async (id, definition) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject(new Error("Connection sadness"))
                return
            }

            const query = {
                text: `
                    UPDATE flashcards
                    SET data = jsonb_set(data, \'{definition}\', to_jsonb($1::text)),
                    updated = NOW()
                    WHERE id = $2`,
                values: [definition, id]
            }


            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError(queryError.stack)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                resolve(result.rowCount)
            })
        })
    }
)
