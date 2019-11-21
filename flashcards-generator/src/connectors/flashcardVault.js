import axios from 'axios';

// FLASHCARDS_VAULT_HOSTNAME = process.env.FLASHCARDS_VAULT_HOSTNAME
const FLASHCARD_VAULT_HOSTNAME = "http://localhost:3001"

const parseSearchTerm = (string) => {
  if (string === "" || string === null){
    return string
  }
  return `%${string.toLowerCase()}%`
}

/* Flashcard queries */

export const insertFlashcard = async (name, topic, term, definition) => {
    console.log('Making POST request to Flashcards Vault to insert flashcards');

    name = name.toLowerCase()
    term = term.toLowerCase()

    try {
        const resp = await axios.post(`${FLASHCARD_VAULT_HOSTNAME}/v1/createFlashcard`, {
            data: {
              name, topic, term, definition,
            },
        });
        console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return { error };
    }
};

export const getFlashcards = async (name, topic_id, term) => {
    console.log('Making POST request to Flashcards Vault get FLASHCARDS');

    name = parseSearchTerm(name.trim())
    term = parseSearchTerm(term.trim())


    try {
        const resp = await axios.post(`${FLASHCARD_VAULT_HOSTNAME}/v1/list`, {
            searchTerms: {
              name, topic_id, term,
            },
        });
        console.log('Request was successful, returning results');
        return { data: resp.data };
    } catch (error) {
        console.log(error);
        return { error };
    }
};


export const updateFlashcard = async (id, term, definition) => {
  console.log('Making POST request to Flashcards Vault update flashcards');
  try {
    const resp = await axios.post("${FLASHCARD_VAULT_HOSTNAME}/v1/update/${id}", {
      data: { definition, term },
    });
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const deleteFlashcard = async (id) => {
  console.log('Making DELETE request to Flashcards Vault');
  try {
    const resp = await axios.delete("${FLASHCARD_VAULT_HOSTNAME}/v1/delete/${id}");
    console.log('Request was successful, returning results');
    return {
      data: resp.data
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

/* Topic Queries */

export const insertTopic = async (name, colour) => {
  console.log('Making POST request to Flashcards Vault to insert TOPIC');
  try {
    const resp = await axios.post(`${FLASHCARD_VAULT_HOSTNAME}/v1/createTopic`, {
      data: {
        name,
        colour,
      },
    });
    console.log(`Got a resp from inserting: ${resp}`);
    return resp;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getTopics = async () => {
  console.log('Making GET request to Flashcards Vault get TOPICS');
  try {
    const resp = await axios.get(`${FLASHCARD_VAULT_HOSTNAME}/v1/listTopics`);
    console.log('Request was successful, returning results');
    return {
      data: resp.data
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getTopicsByName = async ( topic ) => {
  console.log('Making GET request to Flashcards Vault get TOPICS');
  try {
    const parsedTopic = parseSearchTerm(topic)
    const resp = await axios.get(`${FLASHCARD_VAULT_HOSTNAME}/v1/getTopics?topic=${parsedTopic}`);
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};


export const updateTopicName = async (id, name) => {
  console.log('Making POST request to Flashcards Vault to update topic name');
  try {
    const resp = await axios.post("${FLASHCARD_VAULT_HOSTNAME}/v1/updateTopicName/${id}", {
      data: { name },
    });
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const deleteTopic = async (id) => {
  console.log('Making DELETE request to Flashcards Vault for topic');
  try {
    const resp = await axios.delete("${FLASHCARD_VAULT_HOSTNAME}/v1/deleteTopic/${id}");
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

