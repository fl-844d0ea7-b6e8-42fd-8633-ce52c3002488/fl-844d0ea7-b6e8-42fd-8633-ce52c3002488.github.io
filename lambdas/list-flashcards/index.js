const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DB_CONN
})

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

exports.handler = async function (event) {
  console.log("Received request")

  const body = JSON.parse(event.body)
  const { searchTerms } = body

  console.log("Received search terms", searchTerms)

  const { name, term, topic_id } = searchTerms

  const parsedName = parseSearchTerm(name)
  const parsedTerm = parseSearchTerm(term)

  const parsedSearchTerms = {
    name: parsedName,
    term: parsedTerm,
    topic_id
  }

  try {
    const flashcards = await getFlashcards(parsedSearchTerms)

    console.log("Returning data to client")
    return getReturnBody(200, flashcards)
  } catch (e) {
    console.error(e)
    return getReturnBody(503, "")
  }
}

function parseSearchTerm (string) {
  if (string === "" || string === null) {
    return string
  }
  return `%${string.trim()}%`
}

function getFlashcards (searchTerms) {
  return(
    new Promise((resolve, reject) => {

      const hasEmptyValues = (searchTerms) => {
        // console.log("Checking empty values for: ", searchTerms)
        return Object.values(searchTerms).every((val) => (val === null || val === ''))
      }

      console.log("Received request to get flashcards")
      client.connect((err) => {
        if (err) {
          console.log("Error connecting to the DB", err.stack)
          reject(new Error("Connection sadness"))
          return
        }

        const query = {
          text: `SELECT id, flashcards_app.topics.name as topic_name, flashcards_app.flashcards.name as name, term, definition, colour
                FROM flashcards_app.flashcards
                INNER JOIN flashcards_app.topics
                ON flashcards_app.topics.topic_id = flashcards_app.flashcards.topic_id`,
          values: []
        }

        if (!hasEmptyValues(searchTerms)) {
          console.log("Building query parameters")
          let whereClause = ' WHERE '
          Object.entries(searchTerms).map(([column, value], index) => {
            if (!(value === null || value === '')) {
              query.values.push(value)
              if (whereClause !== ' WHERE ') {
                whereClause += ` AND `
              }

              switch (column) {
                case 'topic_id':
                  whereClause += `flashcards_app.flashcards.${column} = $${query.values.length}`
                  break;
                default:
                  whereClause += `flashcards_app.flashcards.${column} like $${query.values.length}`
              }
            }
          })
          console.log(`Built ${whereClause}`)
          query.text += whereClause
          console.log("Query values: ", query.values)
        }

        console.log("Preparing to make query", { queryText: query.text })
        client.query(query, (queryError, result) => {
          if (queryError) {
            console.log('Error occurred', queryError.stack)
            client.end()
            reject(new Error("Postgres sadness :("))
          }

          const results = result.rows

          console.log("Received successfuly result", { results })
          client.end()
          resolve(results)
        })
      })
  }
))}

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