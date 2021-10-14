import http from "../http-common";

const getAll = () => {
  return http.get("/customer");
};

const get = id => {
  return http.get(`/customer/${id}`);
};

const create = data => {
  return http.post("/customer", data);
};

const update = (id, data) => {
  return http.put(`/customer/${id}`, data);
};

const remove = id => {
  
  return http.delete(`/customer/${id}`);
};

const removeAll = () => {
  return http.delete(`/customers`);
};

const getIndividualContacts = (contact_id) =>{
  console.log(contact_id);
  return http.get(`/contacts/${contact_id}`);
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  
  getIndividualContacts
};

