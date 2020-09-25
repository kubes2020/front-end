import Axios from "axios";

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");
  return Axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://bwspotify.herokuapp.com/",
  });
};
