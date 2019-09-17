import { Router } from 'express'
import { createFlashcard, updateFlashcard, deleteFlashcard, listFlashcards } from './controller'

const routes = Router()
    .post('/create', createFlashcard)
    .post('/list', listFlashcards)
    .delete('/delete/:id', deleteFlashcard)
    .post('/update/:id', updateFlashcard)

export default routes
