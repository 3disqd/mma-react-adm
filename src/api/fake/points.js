import { API } from "./index.js";
// import uuid from "uuid";

export default {
  get: () =>(API.get('/users.json')),
  getById: (id)=>(API.get(`/points/${id}.json`))
};
