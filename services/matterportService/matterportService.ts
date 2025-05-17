import axios from "axios";

const API_URL = 
const TOKEN_ID = 
const TOKEN_SECRET = 

export const fetchModels = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: `
        query {
  models (query: "") {
    totalResults
    nextOffset
    results {
      id
      name
    }
  }
}

        `,
      },
      {
        auth: {
          username: TOKEN_ID,
          password: TOKEN_SECRET,
        },
      }
    );
    if (response.data.errors) {
      console.error("API Errors:", response.data.errors);
      return [];
    }

    return response.data.data.models || [];
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
};
