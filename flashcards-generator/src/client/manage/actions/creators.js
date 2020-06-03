import { getTopics as getInitialTopics } from '../../connectors/apigateway'
import {
  GET_TOPICS,
  LOAD_TOPICS,
  UPDATE_TOPIC,
  DELETE_TOPIC,
  GET_FLASHCARDS,
  UPDATE_FLASHCARD,
  DELETE_FLASHCARD,
  GET_TOPICS_SUCCESS
} from './types'

export function getTopicsFromAPI() {
  return async function (dispatch) {
    dispatch(getTopics())

    const resp = await getInitialTopics()

    if (resp && resp.data){
      dispatch(getTopicsSuccess(resp.data))
    }
    return {}
  }
}

export const getTopics = (data = {}) => ({
  type: GET_TOPICS,
})

export const getTopicsSuccess = (data = {}) => ({
  type: GET_TOPICS_SUCCESS,
  data
})

export const updateTopic = data => ({
  type: UPDATE_TOPIC,
  id: data.id,
  data: {
    name: data.name,
    colour: data.colour,
  }
})

export const deleteTopic = id => ({
  type: DELETE_TOPIC,
  id
})

export const getFlashcards = (data = {}) => ({
  type: GET_FLASHCARDS,
  data
})

export const updateFlashcard = data => ({
  type: UPDATE_FLASHCARD,
  id: data.id,
  data: {
    name: data.name,
    term: data.term,
    definition: data.definition
  }
})

export const deleteFlashcard = id => ({
  type: DELETE_FLASHCARD,
  id
})

export const loadTopics = data => ({
  type: LOAD_TOPICS,
  data
})
