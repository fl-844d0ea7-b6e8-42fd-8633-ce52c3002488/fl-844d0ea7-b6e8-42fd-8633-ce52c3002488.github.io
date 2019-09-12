import { logInfo, logError } from './logging/logger'
import { insertFlashcard, getFlashcards } from './data'

export const createFlashcards = async (request, response) => {
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
// export const editFlashcards = async (request, response) => {
//     return response.sendStatus(501)
// }
// export const deleteFlashcards = async (request, response) => {
//     return response.sendStatus(501)
// }

function parseListFlashcardsResults(results){
    return results.map(x => x.data)
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
        const dbResponse = await getFlashcards(searchTerms.map(x => x.toLowerCase()))
        logInfo(`Got response from data: ${dbResponse}`)

        if (dbResponse) {
            logInfo('Got a cool response from the DB')
            const returnedResults = parseListFlashcardsResults(dbResponse)
            return response.status(200).send(returnedResults)
        }
    }
    catch (err) {
        logError(err)
        return response.status(503).send("AAAAAAAARGH")
    }

    // return response.sendStatus(501)
}