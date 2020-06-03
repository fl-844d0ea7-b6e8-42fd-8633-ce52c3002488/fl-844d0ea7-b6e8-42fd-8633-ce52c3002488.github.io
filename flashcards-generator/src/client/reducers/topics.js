import produce from 'immer'
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

export const topics = produce((draft, action) => {
  switch(action.type){

    case LOAD_TOPICS:
      return {
        ...draft,
        topics: action.data
      }

    case GET_TOPICS:
      return draft

    case GET_TOPICS_SUCCESS:
      draft.items = action.data
      return

    case CREATE_TOPIC:
      return [
        ...draft.topics,
        {
          id: action.id,
          name: action.name,
          colour: action.colour
        }
      ]

    case UPDATE_TOPIC:
      return draft.topics

    case DELETE_TOPIC:
      return draft.topics

    default:
      return draft
  }
}, {})
