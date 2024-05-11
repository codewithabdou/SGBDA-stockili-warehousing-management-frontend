"use server";
import API_INFO from "./config";

async function getZones() {
  try {
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.ZONES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    return data.zones;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getZones;
