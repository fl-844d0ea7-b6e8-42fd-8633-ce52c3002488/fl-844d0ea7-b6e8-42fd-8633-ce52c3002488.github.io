import { CREATE_TOPIC } from '../create/actions/types'
import {
  GET_TOPICS,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE,
  UPDATE_TOPIC,
  UPDATE_TOPIC_SUCCESS,
  UPDATE_TOPIC_FAILURE,
  DELETE_TOPIC,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_FAILURE,
  LOAD_TOPICS
} from '../manage/actions/types'
import { getTopics, loadTopics } from '../manage/actions/creators'

export const topics = (state = {}, action) => {
  switch(action.type ){

    case LOAD_TOPICS:
      return {
        ...state,
        topics: action.data
      }

    case GET_TOPICS:
      return state

    case GET_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        topics: {
          items: action.data
        }
      })

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
