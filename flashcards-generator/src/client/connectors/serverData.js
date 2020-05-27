import axios from 'axios';

export const getAbsoluteUrl = relativeUrl => `${window.location.protocol}//${window.location.host}/api/${relativeUrl}`

const parseSearchTerm = (string) => {
  if (string === "" || string === null){
    return string
  }
  return `%${string}%`
}

/* Flashcard queries */


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
