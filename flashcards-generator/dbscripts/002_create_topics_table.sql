CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS flashcards_app;

CREATE TABLE flashcards_app.topics(
    topic_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(100),
    colour varchar(100),
    created timestamp,
    updated timestamp
);