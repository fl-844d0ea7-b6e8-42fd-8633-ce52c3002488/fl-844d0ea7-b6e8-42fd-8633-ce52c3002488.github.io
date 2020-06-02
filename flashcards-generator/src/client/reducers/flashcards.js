import { CREATE_FLASHCARD } from '../create/actions/types'
import { UPDATE_FLASHCARD, DELETE_FLASHCARD } from '../manage/actions/types'

const flashcards = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FLASHCARD:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          term: action.term,
          definition: action.definition
        }
      ]

    case UPDATE_FLASHCARD:
      return state

    case DELETE_FLASHCARD:
      return state

    default:
      return state
  }
}

export default flashcards