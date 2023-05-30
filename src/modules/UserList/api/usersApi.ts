import axios from "axios";
import { ERROR_FETCH, URL_USERS } from "../constants";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      URL_USERS
    );
    return response.data;
  } catch (error) {
    console.log(ERROR_FETCH, error);
    throw error;
  }
};