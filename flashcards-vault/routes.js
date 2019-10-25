import { Router } from 'express'
import {
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    listFlashcards,
    listTopics,
    getTopicsByFilter,
    createTopic
} from './controller'

const routes = Router()
    .post('/createTopic', createTopic)
    .post('/createFlashcard', createFlashcard)
    .post('/list', listFlashcards)
    .delete('/delete/:id', deleteFlashcard)
    .post('/update/:id', updateFlashcard)
    .get('/listTopics', listTopics)
    .post('/getTopics', getTopicsByFilter)

export default routes
