import axios from "axios";

const API_URL = "https://api.matterport.com/api/models/graph";
const TOKEN_ID = "33c96763d9d9a62f";
const TOKEN_SECRET = "59476f444e9c9c7f10d7ad36ebe15db7";

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
