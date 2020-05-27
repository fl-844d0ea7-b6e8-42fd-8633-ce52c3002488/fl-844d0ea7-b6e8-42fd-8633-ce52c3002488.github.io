const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  const id = event.pathParameters.id

  try {
    const flashcardUpdate = await deleteFlashcard(id)

    console.log("Received data: ", flashcardUpdate)
    return getReturnBody(200, flashcardUpdate)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function deleteFlashcard(id) {
  return (
    new Promise((resolve, reject) => {
      console.log("Connecting to database to delete flashcard")
      client.connect((err) => {
        if (err) {
          console.error("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          client.end()
          return
        }

        const query = {
          text: 'DELETE FROM flashcards_app.flashcards where id = $1',
          values: [id]
        }

        client.query(query, (queryError, result) => {
          if (queryError) {
            console.error(queryError.stack)
            reject(new Error("Postgres sadness :("))
            client.end()
            return
          }
          client.end()
          resolve(result)
          return
        })
      })
  }
  ))
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