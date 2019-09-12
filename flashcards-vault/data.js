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


export const getFlashcards = async (searchTerms) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'SELECT data from flashcards ',
                values: []
            }

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

