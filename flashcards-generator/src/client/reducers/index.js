import { combineReducers } from 'redux'

import { topics } from './topics'
import flashcards from './flashcards'

export default combineReducers({
  topics,
  flashcards
})
