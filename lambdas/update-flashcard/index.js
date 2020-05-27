const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  const id = event.pathParameters.id
  const body = JSON.parse(event.body)
  const { data } = body
  const { definition } = data

  console.log(`Received id: ${id} and definition: ${definition}`)

  try {
    const flashcardUpdate = await updateFlashcard(id, definition)

    console.log("Received data: ", flashcardUpdate)
    return getReturnBody(200, flashcardUpdate)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function updateFlashcard (id, definition, term){
  return(
    new Promise((resolve, reject) => {
      client.connect((err) => {
        if (err) {
          console.error("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          client.end()
          return
        }

        const queryText = buildQuery(definition, term)
        const queryValues = buildQueryValues(id, definition, term)

        const query = {
          text: queryText,
          values: queryValues
        }

        client.query(query, (queryError, result) => {
          if (queryError) {
            console.error(queryError.stack)
            reject(new Error("Postgres sadness :("))
            client.end()
            return
          }
          resolve(result.rowCount)
        })
      })
    }
  ))
}

function buildQuery(definition, term) {
  let query = 'UPDATE flashcards_app.flashcards '

  if (definition) {
    query += 'SET definition = $1,'
  }

  query += 'updated = NOW() WHERE id = $2'

  return query
}

function buildQueryValues(id, definition, term) {
  let values = []

  if (definition) {
    values.push(definition)
  }

  if (term) {
    values.push(definition)
  }

  values.push(id)

  return values
}

function getReturnBody(statusCode, body) {
  return {
    "body": JSON.stringify(body),
    "statusCode": statusCode,
    "isBase64Encoded": false,
    "headers": {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "OPTIONS,GET"
    }
  }
}