import { CREATE_TOPIC } from '../create/actions/types'
import { UPDATE_TOPIC, DELETE_TOPIC } from '../manage/actions/types'

const topics = (state = {}, action) => {
  switch(action.type ){
    case CREATE_TOPIC:
      return [
        ...state.topics,
        {
          id: action.id,
          name: action.name,
          colour: action.colour
        }
      ]

    case UPDATE_TOPIC:
      return state.topics

    case DELETE_TOPIC:
      return state.topics

    default:
      return state
  }
}

export default topics