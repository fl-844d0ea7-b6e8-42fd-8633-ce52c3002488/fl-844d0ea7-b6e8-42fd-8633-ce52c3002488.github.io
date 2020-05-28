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

  console.log('Received flashcard data ', data)
  console.log(`Updating flashcard with id ${id}`)

  try {
    const flashcardUpdate = await updateFlashcard(id, data)

    console.log("Received data: ", flashcardUpdate)
    return getReturnBody(200, flashcardUpdate)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function updateFlashcard (id, data){
  return(
    new Promise((resolve, reject) => {
      client.connect((err) => {
        if (err) {
          console.error("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          client.end()
          return
        }

        const queryText = buildQuery(data)
        const queryValues = buildQueryValues(id, data)

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
          client.end()
        })
      })
    }
  ))
}

function buildQuery(flashcardData) {
  let query = 'UPDATE flashcards_app.flashcards '

  Object.entries(flashcardData).forEach(([key, val], index) => {
    if (index === 0) {
      query += `SET ${key}=$${index+1} `
    }
    else {
      query += `,${key}=$${index+1}`
    }
  })

  query += `,updated = NOW() WHERE id=$${Object.entries(flashcardData).length+1};`

  console.log(query)

  return query
}

function buildQueryValues(id, flashcardData) {
  let values = []
  Object.entries(flashcardData).forEach(([_, value]) => {
    values.push(value)
  })

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