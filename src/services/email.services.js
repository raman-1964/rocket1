import axios from "axios";
const BASE_URL = process.env.REACT_APP_URL;

export const getAllEmailsApi = async (page) => {
  try {
    const res = await axios.get(BASE_URL+"?page="+page);
    return res.data.list;
  } catch (e) {
    throw Error(e.response?.data ?? "something went wrong");
  }
};

export const getSingleEmailApi = async (id) => {
  try {
    const res = await axios.get(BASE_URL + "?id=" + id);
    return res.data;
  } catch (e) {
    throw Error(e.response?.data ?? "something went wrong");
  }
};
