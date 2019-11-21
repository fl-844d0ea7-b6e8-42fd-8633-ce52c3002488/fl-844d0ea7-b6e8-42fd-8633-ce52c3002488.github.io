import { Pool } from 'pg'

const postgresPool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'testpassword',
    database: 'postgres',
    port: 54320,
    schema: 'flashcards_app'
})