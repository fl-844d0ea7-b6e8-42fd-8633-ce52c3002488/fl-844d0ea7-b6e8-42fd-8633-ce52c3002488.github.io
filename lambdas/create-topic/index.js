const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  try {
    const dbResponse = await insertTopic()

    return getReturnBody(200, dbResponse)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function insertTopic (name, colour) {
  return  new Promise(
    (resolve, reject) => {
      console.log("Connecting to database to insert topic")

      client.connect()

      console.log("Connected to database successfully")

      const query = {
        text: 'INSERT INTO flashcards_app.topics(name, colour, created, updated) VALUES($1, $2, NOW(), NOW())',
        values: [name, colour]
      }

      console.log(`Making query ${query.text}`)

      client.query(query, (queryError, result) => {
        if (queryError) {
          console.error(queryError)
          reject(new Error("Postgres sadness :("))
          return
        }
        console.log(`Received result: ${result.rowCount}`)
        resolve(result.rowCount)
        client.end()
      })
    }
  )
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