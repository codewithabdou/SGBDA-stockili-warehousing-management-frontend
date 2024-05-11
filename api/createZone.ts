"use server";
import API_INFO from "./config";

async function createZone(zone: any) {
  const JSONdata = JSON.stringify(zone);
  try {
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.ZONES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default createZone;
