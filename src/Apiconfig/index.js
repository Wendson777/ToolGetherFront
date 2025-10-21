const LOCAL_IP = "192.168.68.106";

const API_PORT = "3333";

export const BASE_API_URL = `http://${LOCAL_IP}:${API_PORT}`;

// Endpoints usados no Home.js
export const PRODUCTS_URL = `${BASE_API_URL}/getproducts`;
export const CATEGORIES_URL = `${BASE_API_URL}/categories`;
