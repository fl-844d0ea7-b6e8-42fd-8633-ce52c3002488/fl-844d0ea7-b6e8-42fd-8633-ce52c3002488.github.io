import { Router } from 'express'
import { createFlashcards, editFlashCards, deleteFlashcards, listFlashcards } from './controller'

const routes = Router()
    .post('/create', createFlashcards)
    .post('/list', listFlashcards)
    // .get('/delete', deleteFlashcards)
    // .get('/edit', editFlashCards)

export default routes
