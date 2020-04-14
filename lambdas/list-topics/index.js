const https = require('https')
const pg = require('pg')
const {
  Client
} = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})


const getTopics = async () => new Promise(
  (resolve, reject) => {
    const query = {
      text: 'SELECT topic_id, name, colour FROM flashcards_app.topics'
    }

    console.log("Connecting to client")

    client.connect()

    client.query(query, (queryError, result) => {
      if (queryError) {
        console.log(queryError.stack)
        reject(new Error("Postgres sadness :("))
        client.end()
        return
      }
      resolve(result.rows)
      client.end()
    })
  })

exports.handler = async function (event) {
  console.log("Received request")

  try {
    const topics = await getTopics()

    console.log("Received data: ", topics)
    return {
      "body": JSON.stringify(topics),
      "statusCode": 200,
      "isBase64Encoded": false
    }
  } catch (e) {
    console.error(e)
  }
}