const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")


  try {
    const topics = await getTopics()

    console.log("Received data: ", topics)
    return getReturnBody(200, topics)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}


export const removeTopic = async (id) => new Promise(
  (resolve, reject) => {
    logInfo("Connecting to database to delete topic")
    postgresPool.connect((connectError, client, release) => {
      if (connectError) {
        logError("Error connecting to the DB", connectError.stack)
        reject(new Error("Connection sadness"))
        return
      }

      const query = {
        text: 'DELETE FROM flashcards_app.topics where topic_id = $1',
        values: [id]
      }

      client.query(query, (queryError, result) => {
        release()
        if (queryError) {
          logError(queryError.stack)
          reject(new Error("Postgres sadness :("))
          return
        }
        resolve(result)
      })
    })
  }
)

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
