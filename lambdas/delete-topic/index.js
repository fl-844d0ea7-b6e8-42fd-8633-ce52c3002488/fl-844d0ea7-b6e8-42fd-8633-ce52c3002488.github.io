const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  const id = event.pathParameters.id

  console.log(`Received id: ${id}`)

  try {
    const topics = await removeTopic(id)

    console.log("Received data: ", topics)
    return getReturnBody(200, topics)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function removeTopic (id){
  return (
    new Promise((resolve, reject) => {
      console.log("Connecting to database to delete topic")
      client.connect((err) => {
        if (err) {
          console.log("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          return
        }

        const query = {
          text: 'DELETE FROM flashcards_app.topics where topic_id = $1',
          values: [id]
        }

        client.query(query, (queryError, result) => {
          console.log("Performing query", query.text)

          if (queryError) {
            console.log(queryError.stack)
            reject(new Error("Postgres sadness :("))
          }
          resolve(result)
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