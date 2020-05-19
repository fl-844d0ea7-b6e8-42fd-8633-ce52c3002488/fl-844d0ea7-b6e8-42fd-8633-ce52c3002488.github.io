import axios from 'axios';

export const getAbsoluteUrl = relativeUrl => `${window.location.protocol}//${window.location.host}/api/${relativeUrl}`

const parseSearchTerm = (string) => {
  if (string === "" || string === null){
    return string
  }
  return `%${string}%`
}

/* Flashcard queries */

export const insertFlashcard = async (name, topic, term, definition) => {
    console.log('Making POST request to Flashcards Vault to insert flashcards');

    name = name.toLowerCase()
    term = term.toLowerCase()

    try {
        const resp = await axios.post(`/api/createFlashcard`, {
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
        const resp = await axios.post(`/api/list`, {
            searchTerms: {
              name, topic_id, term,
            },
        });
        console.log('Request was successful, returning results');
        console.log('Data: oooooooo', resp.data)
        return { data: resp.data };
    } catch (error) {
        console.log(error);
        return { error };
    }
};

export const updateFlashcard = async (id, term, definition) => {
  console.log('Making POST request to Flashcards Vault update flashcards');
  try {
    const resp = await axios.post(`/api/update/${id}`, {
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
    const resp = await axios.delete(`/api/delete/${id}`);
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
    const resp = await axios.post(`/api/createTopic`, {
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
    const url = getAbsoluteUrl('getTopics')
    console.log('Making request to: ', url)
    const resp = await axios.get(url);
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
  console.log('Making GET request to Flashcards Vault get TOPICS by name');
  try {
    const parsedTopic = parseSearchTerm(topic)
    const resp = await axios.get(`/api/getTopics?topic=${parsedTopic}`);
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
    const resp = await axios.post(`/api/updateTopicName/${id}`, {
      data: { name },
    });
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
