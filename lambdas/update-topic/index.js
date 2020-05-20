const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  const id = event.pathParameters.id
  const body = JSON.parse(event.body)
  const { name } = body

  console.log(`Received id: ${id} and name: ${name}`)

  try {
    const topics = await updateTopicName(id)

    console.log("Received data: ", topics)
    return getReturnBody(200, topics)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function updateTopicName(id, name) {
  return (
    new Promise((resolve, reject) => {
      client.connect((err) => {
        if (err) {
          console.log("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          client.end()
          return
        }

        const query = {
          text: `
            UPDATE flashcards_app.topics
            SET name = $1,
            updated = NOW()
            WHERE topic_id = $2`,
          values: [name, id]
        }

        client.query(query, (queryError, result) => {
          if (queryError) {
            console.log(queryError.stack)
            reject(new Error("Postgres sadness :("))
            client.end()
          }
          resolve(result.rowCount)
          client.end()
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