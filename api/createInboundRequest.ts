"use server";
import API_INFO from "./config";

type InRequests = {
  zone_id: string;
  quantity: number;
};

async function createInboundRequest(data: {
  productId: string;
  zonesQuantities: InRequests[];
}) {
  try {
    const response = await fetch(`${API_INFO.INBOUND(data.productId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.zonesQuantities),
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export default createInboundRequest;
