export const buildQuery = (id, definition, term) => {
  let query = 'UPDATE flashcards_app.flashcards '

  if (definition) {
    query += 'SET data = jsonb_set(data, \'{definition}\', to_jsonb($1::text)),'
  }

  if (term) {
    query += 'SET data = jsonb_set(data, \'{term}\', to_jsonb($1::text)),'
  }

  query += 'updated = NOW() WHERE id = $2'

  return query
}

export const buildQueryValues = (id, definition, term) => {
  let values = [id]

  if (definition) {
    values.push(definition)
  }

  if (term) {
    values.push(definition)
  }

  return values
}