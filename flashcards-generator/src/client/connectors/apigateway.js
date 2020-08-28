import axios from 'axios'
import axiosRetry from 'axios-retry'

const API_HOSTNAME = process.env.API_HOSTNAME
const API_KEY = process.env.API_KEY

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': API_KEY
  }
}

const axiosInstance = axios.create({
  baseUrl: `${API_HOSTNAME}/api`,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': API_KEY
  }
})

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000 //exponential backoff
  }
})

/* Topic queries */

export const getTopics = async () => {
  console.log('Making GET request to Flashcards Vault get TOPICS');

  try {
    const resp = await axiosInstance.get(`${API_HOSTNAME}/api/listTopics`, config);

    console.log('Received response with status: ', resp.status);

    return {
      data: resp.data
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getTopicsByName = async (name) => {
  console.log('Making GET request to Flashcards Vault get TOPICS by name');

  try {
    const resp = await axiosInstance.get(`${API_HOSTNAME}/api/listTopicsByName/${name}`, config)

    console.log('Received response with status: ', resp.status);

    return {
      data: resp.data
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const insertTopic = async (name, colour) => {
  console.log('Making POST request to Flashcards Vault to insert TOPIC');

  try {
    const resp = await axiosInstance.post(
      `${API_HOSTNAME}/api/createTopic`,
      { data: { name, colour } },
      config,
    );

    console.log(`Got a resp from inserting: ${resp}`);
    return resp;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const deleteTopic = async (id) => {
  console.log('Making DELETE request to Flashcards Vault for topic');
  try {
    const resp = await axiosInstance.delete(`${API_HOSTNAME}/api/deleteTopic/${id}`, config);
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
    const resp = await axiosInstance.post(`${API_HOSTNAME}/api/updateTopic/${id}`, { name }, config);
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};


/* Flashcard Queries */
export const getFlashcards = async (name, topic_id, term) => {
  console.log('Making POST request to Flashcards Vault get FLASHCARDS');

  try {
    const resp = await axiosInstance.post(
      `${API_HOSTNAME}/api/listFlashcards`,
      {
        searchTerms: {
          name, topic_id, term,
        },
      },
      config
    );

    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const insertFlashcard = async (name, topic, term, definition) => {
  console.log('Making POST request to Flashcards Vault to insert flashcards');

  try {
    const resp = await axiosInstance.post(
      `${API_HOSTNAME}/api/createFlashcard`,
      {
        data: {
          name, topic, term, definition,
        },
      },
      config
    );
    return resp;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const updateFlashcard = async (id, data) => {
  console.log('Making POST request to Flashcards Vault update flashcards');
  try {
    const resp = await axiosInstance.post(`${API_HOSTNAME}/api/updateFlashcard/${id}`, { data }, config);
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const deleteFlashcard = async (id) => {
  console.log('Making POST request to Flashcards Vault delete flashcards');
  try {
    const resp = await axiosInstance.delete(`${API_HOSTNAME}/api/deleteFlashcard/${id}`, config);
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};