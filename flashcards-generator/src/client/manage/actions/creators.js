import {
  getTopics as fetchTopics,
  getFlashcards as fetchFlashcards
} from '../../connectors/apigateway'
import {
  GET_TOPICS,
  LOAD_TOPICS,
  UPDATE_TOPIC,
  DELETE_TOPIC,
  GET_FLASHCARDS,
  UPDATE_FLASHCARD,
  DELETE_FLASHCARD,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE
} from './types'

export function getTopicsFromAPI() {
  return async function (dispatch) {
    dispatch(getTopics())

    const resp = await fetchTopics()

    if (resp && resp.data){
      dispatch(getTopicsSuccess(resp.data))
    }
    return {}
  }
}

export function getFlashcardsFromAPI(data) {
  return async function (dispatch) {
    dispatch(getFlashcards())

    const resp = await fetchFlashcards(data)

    if (resp && resp.data){
      dispatch(getFlashcardsSuccess(resp.data))
    }
    dispatch(getFlashcards)
  }
}

export const getTopics = (data = {}) => ({
  type: GET_TOPICS,
})

export const getTopicsSuccess = (data = {}) => ({
  type: GET_TOPICS_SUCCESS,
  data
})

export const getTopicsFailure = (data = {}) => ({
  type: GET_TOPICS_FAILURE,
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
