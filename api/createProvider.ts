"use server";

import API_INFO from "./config";

async function createProvider(provider: any) {
  try {
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.PROVIDERS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default createProvider;
