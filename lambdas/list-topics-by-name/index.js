const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  const name = event.pathParameters.name

  console.log(`Found search name: ${name}`)

  // try {
    const topics = await getTopicsByName(`%${name}%`)

    console.log("Received data: ", topics)
    return getReturnBody(200, topics)
  // } catch (e) {
  //   console.error(e)
  //   return getReturnBody(503, "")
  // }
}

async function getTopicsByName (name) {
  return (
    new Promise((resolve, reject) => {
      console.log("Making connectiong to database")
      client.connect((err) => {
        if (err) {
          console.log("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          return
        } else {
          console.log("Successfully connected to client and DB")
        }

        const query = {
          text: 'SELECT * FROM flashcards_app.topics WHERE name like $1',
          values: [name]
        }

        console.log("Performing query", query.text)

        client.query(query, (queryError, result) => {
          if (queryError) {
            console.log(queryError.stack)
            reject(new Error("Postgres sadness :("))
            client.end()
            return
          }
          console.log("Received result", { count: result.rows })
          resolve(result.rows)
          client.end()
        })
      })
    }))
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