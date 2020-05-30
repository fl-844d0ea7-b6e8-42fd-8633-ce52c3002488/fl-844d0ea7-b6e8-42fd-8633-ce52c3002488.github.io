import { CREATE_TOPIC, UPDATE_TOPIC, DELETE_TOPIC } from './types'
import { v4 as uuidv4 } from 'uuid';

export const createTopic = data => ({
  type: CREATE_TOPIC,
  id: uuidv4(),
  data: {
    name: data.name,
    colour: data.colour,
  }
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