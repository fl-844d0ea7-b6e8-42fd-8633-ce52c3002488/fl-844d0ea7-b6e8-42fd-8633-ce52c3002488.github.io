CREATE SCHEMA IF NOT EXISTS flashcards_app;

CREATE TABLE flashcards_app.topics(
    topic_id SERIAL primary key,
    name varchar(100),
    colour varchar(100),
    created timestamp,
    updated timestamp
);