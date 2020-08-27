const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  console.log("Extracting from body")
  const { data } = JSON.parse(event.body)
  const { name, colour } = data

  console.log("Validating request")
  if (!name || !colour){
    console.log(`Invalid request: Received name (${name}) and colour (${colour})`)
    return getReturnBody(400, "")
  }

  try {
    const dbResponse = await insertTopic(name, colour)

    return getReturnBody(200, dbResponse)

  } catch (e) {
    console.log("Error occured")
    console.error(e)
    return getReturnBody(503, "")
  }
}

async function insertTopic (name, colour) {
  return  new Promise(
    (resolve, reject) => {
      console.log("Connecting to database to insert topic")

      client.connect(err => {
        if (err) {
          console.error("Issue connecting to DB: ", err.stack)
          reject(new Error("DB Connection error"))
        } else {
          console.log("Successfully connected to client and DB")
        }
      })

      console.log("Connected to database successfully")

      const query = {
        text: 'INSERT INTO flashcards_app.topics(name, colour, created, updated) VALUES($1, $2, NOW(), NOW())',
        values: [name, colour]
      }

      console.log(`Making query ${query.text}`)

      client.query(query, (queryError, result) => {
        if (queryError) {
          console.error(queryError)
          reject(new Error("Query Error"))
        }
        console.log(`Received result: ${result.rowCount}`)
        resolve(result.rowCount)
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