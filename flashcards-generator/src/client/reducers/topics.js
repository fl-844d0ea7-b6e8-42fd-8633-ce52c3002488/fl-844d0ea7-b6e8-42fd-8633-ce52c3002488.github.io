import { ADD_TOPIC, UPDATE_TOPIC, DELETE_TOPIC } from '../create/actions/types'

const topics = (state = {}, action) => {
  switch(action.type ){
    case ADD_TOPIC:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          colour: action.colour
        }
      ]

    case UPDATE_TOPIC:
      return state

    case DELETE_TOPIC:
      return state

    default:
      return state
  }
}

export default topics