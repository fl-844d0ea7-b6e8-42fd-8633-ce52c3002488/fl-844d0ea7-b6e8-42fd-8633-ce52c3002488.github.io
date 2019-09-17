import { logInfo, logError } from './logging/logger'
import {
    insertFlashcard,
    getFlashcards,
    removeFlashcard,
    updateFlashcardDefinition
} from './data'

export const createFlashcard = async (request, response) => {
    logInfo("Received request to create Flashcards")

    const { data } = request.body

    logInfo("Data in received request", { data })

    const {name, topic, term, definition} = data

    const flashcardData = { term, definition }

    logInfo("Inserting into database ", {flashcardData, topic, name})

    try {
        const dbResponse = await insertFlashcard(flashcardData, topic, name)
        logInfo(`Got response from data: ${dbResponse}`)

        if (dbResponse) {
            logInfo("Got a valid reponse from DB")
            return response.sendStatus(200)
        }
        else{
            logError("No response from db...")
            return response.sendStatus(503)
        }

    } catch (err) {
        logError(err)
    }
}
export const updateFlashcard = async (request, response) => {

    const { id } = request.params
    logInfo('Received request to update flashcard', id)

    const { data } = request.body
    logInfo("Received data", data)

    const { definition, term} = data

    if (definition) {
        try{
            const dbResponse = await updateFlashcardDefinition(id, definition)
            logInfo(`Got response from data: ${dbResponse}`)

            if (dbResponse) {
                logInfo("Got a valid reponse from DB")
                return response.sendStatus(200)
            } else {
                logError("No response from db...")
                return response.sendStatus(503)
            }
        } catch (err) {
            logError(err)
            return response.sendStatus(503)
        }
    }
    return response.sendStatus(400)
}

export const deleteFlashcard = async (request, response) => {

    const { id } = request.params
    logInfo("Received request to delete flashcard", {id})

    try {
        const dbResponse = await removeFlashcard(id)
        logInfo(`Got response from data: ${dbResponse}`)

        if (dbResponse) {
            logInfo("Got a valid reponse from DB")
            return response.sendStatus(200)
        } else {
            logError("No response from db...")
            return response.sendStatus(503)
        }
    } catch (err) {
        logError("Got error from the database", err)
        logError(err)
        return response.sendStatus(503)
    }
}

export const listFlashcards = async (request, response) => {

    logInfo("Received request to list flashcards")

    const { searchTerms } = request.body

    if (!searchTerms) {
        logError("No search terms found in request", request.body )
        return response.sendStatus(400)
    }

    logInfo("Got search terms", { searchTerms })

    try {
        logInfo("Making request to database")
        const dbResponse = await getFlashcards(searchTerms)
        logInfo(`Got response from data: ${dbResponse}`)

        if (dbResponse) {
            logInfo('Got a cool response from the DB')
            return response.status(200).send(dbResponse)
        }

        logInfo("No response received", dbResponse)
    }
    catch (err) {
        logError("Got an error", {err})
        return response.status(503).send("AAAAAAAARGH")
    }
}