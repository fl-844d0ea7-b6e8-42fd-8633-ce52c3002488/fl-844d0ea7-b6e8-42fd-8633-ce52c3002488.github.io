import axios from 'axios'

const API_HOSTNAME = process.env.API_HOSTNAME

export const getTopics = async () => {
  console.log('Making GET request to Flashcards Vault get TOPICS');

  try {
    console.log(`Making request to: ${API_HOSTNAME}/api/listTopics`)

    const resp = await axios.get(`${API_HOSTNAME}/api/listTopics`);

    console.log('Request was successful, returning results');
    return {
      data: resp.data
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};