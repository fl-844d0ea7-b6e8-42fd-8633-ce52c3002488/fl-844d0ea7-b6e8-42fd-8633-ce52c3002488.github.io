CREATE SCHEMA
IF NOT EXISTS flashcards_app;

CREATE TABLE flashcards_app.flashcards
(
    id SERIAL primary key,
    topic_id INTEGER REFERENCES flashcards_app.topics(topic_id),
    name varchar(250) NOT NULL,
    term VARCHAR(100) NOT NULL,
    definition VARCHAR(500) NOT NULL,
    created timestamp,
    updated timestamp
);