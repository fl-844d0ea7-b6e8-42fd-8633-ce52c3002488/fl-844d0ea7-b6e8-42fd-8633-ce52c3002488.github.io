import { Pool } from 'pg'
import { logInfo, logError } from './logging/logger'

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const socketPath = process.env.DB_SOCKET

const postgresPool = new Pool({
    user,
    password,
    database,
    socketPath
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

export const getTopicsByName = async ( name ) => new Promise(
    (resolve, reject) => {
        logInfo("Making connectiong to database")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'SELECT * FROM flashcards_app.topics WHERE name like $1',
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
                resolve(result.rows)
            })
        })
    }
)

export const insertFlashcard = async (term, definition, topic, name) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'INSERT INTO flashcards_app.flashcards(term, definition, topic_id, name, created, updated) VALUES($1, $2, $3, $4, NOW(), NOW())',
                values: [term, definition, topic, name]
            }

            logInfo(`Making query: ${query.text}`)

            client.query(query, (queryError, result) => {
                release()
                // console.log(queryError)
                if (queryError) {
                    reject(new Error("Postgres sadness :("))
                    return null
                }
                resolve(result.rowCount)
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
                    reject(new Error("Postgres sadness :("))
                    return
                }
                logInfo(`Received result: ${result.rowCount}`)
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
                text: 'DELETE FROM flashcards_app.flashcards where id = $1',
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

export const getTopics = async () => new Promise(
    (resolve, reject) => {
        logInfo("Connecting to database to get topics")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: 'SELECT topic_id, name, colour FROM flashcards_app.topics'
            }

            client.query(query, (queryError, result) => {
                release()
                if (queryError) {
                    logError(queryError.stack)
                    reject(new Error("Postgres sadness :("))
                    return
                }
                resolve(result.rows)
            })
        })
    }
)

export const getFlashcards = async (searchTerms) => new Promise(
    (resolve, reject) => {

        const hasEmptyValues = (searchTerms) => {
            // console.log("Checking empty values for: ", searchTerms)
            return Object.values(searchTerms).every((val) => (val === null || val === ''))
        }

        logInfo("Received request to get flashcards")
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject( new Error("Connection sadness"))
                return
            }

            const query = {
                text: `SELECT id, flashcards_app.topics.name as topic_name, term, definition, colour FROM flashcards_app.flashcards INNER JOIN flashcards_app.topics ON flashcards_app.topics.topic_id = flashcards_app.flashcards.topic_id`,
                values: []
            }

            if (!hasEmptyValues(searchTerms)){
                logInfo("Building query parameters")
                let whereClause = ' WHERE '
                Object.entries(searchTerms).map(([column, value], index) => {
                    // console.log(`${index}: ${column} => ${value}`)
                    if (!(value === null || value === '')){
                        query.values.push(value)
                        if (whereClause !== ' WHERE '){
                            whereClause += ` AND `
                        }

                        switch(column) {
                            case 'topic_id':
                                whereClause += `flashcards_app.flashcards.${column} = $${query.values.length}`
                                break;
                            default:
                                whereClause += `flashcards_app.flashcards.${column} like $${query.values.length}`
                        }
                    }
                })
                logInfo(`Built ${whereClause}`)
                query.text += whereClause
                logInfo("Query values: ", query.values)
            }

            logInfo("Preparing to make query", {queryText: query.text})
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
                    UPDATE flashcards_app.flashcards
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

export const updateTopicByName = async (id, name) => new Promise(
    (resolve, reject) => {
        postgresPool.connect((connectError, client, release) => {
            if (connectError) {
                logError("Error connecting to the DB", connectError.stack)
                reject(new Error("Connection sadness"))
                return
            }

            const query = {
                text: `
                    UPDATE flashcards_app.topics
                    SET name = $1,
                    updated = NOW()
                    WHERE topic_id = $2`,
                values: [name, id]
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
