import { CREATE_TOPIC, CREATE_FLASHCARD } from './types'
import { v4 as uuidv4 } from 'uuid';

export const createTopic = data => ({
  type: CREATE_TOPIC,
  id: uuidv4(),
  data: {
    name: data.name,
    colour: data.colour,
  }
})

export const createFlashcard = data => ({
  type: CREATE_FLASHCARD,
  id: uuidv4(),
  data: {
    name: data.name,
    term: data.term,
    definition: data.definition
  }
})
