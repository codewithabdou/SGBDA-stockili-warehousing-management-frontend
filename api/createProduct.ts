"use server";
import API_INFO from "./config";

async function createProduct(product: any) {
  const JSONData = JSON.stringify(product);
  try {
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.PRODUCTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default createProduct;
