import axios from 'axios'

const API_HOSTNAME = process.env.API_HOSTNAME
const API_KEY = process.env.API_KEY

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': API_KEY
  }
}

export const getTopics = async () => {
  console.log('Making GET request to Flashcards Vault get TOPICS');

  try {
    const resp = await axios.get(`${API_HOSTNAME}/api/listTopics`, config);

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
    const resp = await axios.post(
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
    const resp = await axios.delete(`${API_HOSTNAME}/api/deleteTopic/${id}`);
    console.log('Request was successful, returning results');
    return { data: resp.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
