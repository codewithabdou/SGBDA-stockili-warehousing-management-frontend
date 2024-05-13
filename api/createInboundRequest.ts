"use server";
import API_INFO from "./config";

type InRequests = {
  zone_id: number;
  quantity: number;
};

async function createInboundRequest(data: {
  productId: string;
  zonesQuantities: InRequests[];
  processedIn: string;
}) {
  const bodyData = JSON.stringify({ zonesQuantities: data.zonesQuantities });
  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${
        data.processedIn === "Data Layer"
          ? API_INFO.INBOUND(data.productId)
          : API_INFO.INBOUND_APPLICATION(data.productId)
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export default createInboundRequest;
