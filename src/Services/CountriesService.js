import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/";

export const getAll = () => {
  return axios
    .get(baseUrl + "all")
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const getByName = (name) => {
  return axios
    .get(`${baseUrl}name/${name}`)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
