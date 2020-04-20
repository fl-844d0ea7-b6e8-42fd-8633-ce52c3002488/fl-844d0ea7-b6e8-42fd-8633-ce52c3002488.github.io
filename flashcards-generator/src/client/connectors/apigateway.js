import axios from 'axios'

const API_HOSTNAME = process.env.API_HOSTNAME
const API_KEY = process.env.API_KEY

const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
}

export const getTopics = async () => {
  console.log(`Making GET request to Flashcards Vault get TOPICS apikey: ${API_KEY}`);

  try {
    const resp = await axios.get(`${API_HOSTNAME}/api/listTopics`, config);

    console.log('Request was successful, returning results');
    return {
      data: resp.data
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};