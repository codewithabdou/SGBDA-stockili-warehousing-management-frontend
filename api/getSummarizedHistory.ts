"use server";

import API_INFO from "./config";

async function getSummarizedHistory(product: { productId: string }) {
  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${API_INFO.SUMMARIZED_HISTORY(product.productId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.history;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default getSummarizedHistory;
