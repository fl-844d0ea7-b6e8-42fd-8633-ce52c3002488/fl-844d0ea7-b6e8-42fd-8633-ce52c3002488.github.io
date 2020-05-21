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

async function getTopics() {
  return new Promise(
  (resolve, reject) => {
    const query = {
      text: 'SELECT topic_id, name, colour FROM flashcards_app.topics'
    }

    console.log("Connecting to client")

    client.connect(err => {
      if (err){
        console.error("Issue connecting to DB: ", err.stack)
        reject(new Error("DB Connection error"))
      } else {
        console.log("Successfully connected to client and DB")
      }
    })

    client.query(query, (queryError, result) => {
      if (queryError) {
        console.log(queryError)
        reject(new Error("Query error"))
        client.end()
        return
      }
      resolve(result.rows)
      client.end()
    })
  })
}

function getReturnBody(statusCode, body) {
  return {
    "body": JSON.stringify(body),
    "statusCode": statusCode,
    "isBase64Encoded": false,
    "headers": {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "OPTIONS,GET",
      "Content-Type": "application/json"
    }
  }

}