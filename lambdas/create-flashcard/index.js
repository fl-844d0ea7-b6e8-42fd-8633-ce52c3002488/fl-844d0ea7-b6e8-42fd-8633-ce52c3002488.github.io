const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")



  const { data } = JSON.parse(event.body)

  const { term, definition, topic, name } = data

  parsedName = name.toLowerCase()
  parsedTerm = term.toLowerCase()

  try {
    const topics = await insertFlashcard(parsedTerm, definition, topic, parsedName)

    console.log("Received data: ", topics)
    return getReturnBody(200, topics)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function insertFlashcard (term, definition, topic, name) {
  return (
    new Promise((resolve, reject) => {
      client.connect((err) => {
        if (err) {
          console.log("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          return
        }

        const query = {
          text: 'INSERT INTO flashcards_app.flashcards(term, definition, topic_id, name, created, updated) VALUES($1, $2, $3, $4, NOW(), NOW())',
          values: [term, definition, topic, name]
        }

        console.log(`Making query: ${query.text}`)

        client.query(query, (queryError, result) => {
          console.log(queryError)
          if (queryError) {
            reject(new Error("Postgres sadness :("))
          }
          resolve(result.rowCount)
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
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Content-Type": "application/json"
    }
  }

}