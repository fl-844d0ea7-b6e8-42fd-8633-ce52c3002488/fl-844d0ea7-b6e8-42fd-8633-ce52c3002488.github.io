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