const ADD_TOPIC = 'ADD_TOPIC'

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
    default:
      return state
  }
}

export default topics