"use server";

import API_INFO from "./config";

async function getProducts() {
  try {
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.PRODUCTS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log(error);
  }
}

export default getProducts;
