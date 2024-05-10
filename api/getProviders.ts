"use server";
import API_INFO from "./config";

async function getProviders() {
  try {
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.PROVIDERS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.providers;
  } catch (error) {
    console.log(error);
  }
}

export default getProviders;
