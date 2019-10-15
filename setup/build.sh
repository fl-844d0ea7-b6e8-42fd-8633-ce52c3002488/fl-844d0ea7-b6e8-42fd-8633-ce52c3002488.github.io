docker-compose up -d

export PGPASSWORD=testpassword

psql -h localhost -p 54320 -U postgres -d postgres -f "../flashcards-generator/dbscripts/002_create_topics_table.sql" -e
psql -h localhost -p 54320 -U postgres -d postgres -f "../flashcards-generator/dbscripts/001_create_flashcards_table.sql" -e