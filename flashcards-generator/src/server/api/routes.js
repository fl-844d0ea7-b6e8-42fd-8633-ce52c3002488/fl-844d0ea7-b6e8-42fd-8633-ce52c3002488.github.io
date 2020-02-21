import { Router } from 'express'
import {
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    deleteTopic,
    listFlashcards,
    listTopics,
    getTopicsByFilter,
    createTopic,
    updateTopicName
} from './controller'

const routes = Router()
    .post('/createTopic', createTopic)
    .post('/createFlashcard', createFlashcard)
    .post('/list', listFlashcards)
    .delete('/delete/:id', deleteFlashcard)
    .delete('/deleteTopic/:id', deleteTopic)
    .post('/update/:id', updateFlashcard)
    .post('/updateTopicName/:id', updateTopicName)
    .get('/listTopics', listTopics)
    .get('/getTopics', getTopicsByFilter)

export default routes
