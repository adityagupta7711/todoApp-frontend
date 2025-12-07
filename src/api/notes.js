import API from "./axios";

// All functions use the API instance (which already attaches the token)
export const getNotes = () => API.get("/notes");
export const createNote = (title, content) =>
  API.post("/notes", { title, content });
export const updateNote = (id, title, content) =>
  API.put(`/notes/${id}`, { title, content });
export const deleteNote = (id) => API.delete(`/notes/${id}`);
