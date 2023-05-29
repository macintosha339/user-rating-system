import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "https://random-data-api.com/api/users/random_user?size=3"
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};