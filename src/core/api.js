import axios from "axios";

const URL = "http://localhost:3000";

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCubes() {
  try {
    const response = await api.get('/cubes');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCube(id) {
  try {
    const response = await api.get(`/cubes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLiked() {
  try {
    const response = await api.get('/liked');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getImage(id) {
  try {
    const response = await api.get(`/images/cube${id}.jpg`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNewCubes() {
  try {
    const response = await api.get('/cubes');
    let arr = response.data;
    return arr.filter((product) => product.new === true);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function like(id) {
  try {
    const response = await api.post(`/liked/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}