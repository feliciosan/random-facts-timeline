import api from "../api";

const get = () => {
  return api.get("/random/year?json");
};

const services = {
  get,
};

export default services;
