import axios from 'axios';

export const getAbsoluteUrl = relativeUrl => `${window.location.protocol}//${window.location.host}/api/${relativeUrl}`

const parseSearchTerm = (string) => {
  if (string === "" || string === null){
    return string
  }
  return `%${string}%`
}

/* Flashcard queries */

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
