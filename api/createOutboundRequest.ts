"use server";

import API_INFO from "./config";

async function createOutboundRequest(outboundRequest: {
  productId: string;
  quantity: number;
}) {
  const JSONdata = JSON.stringify({
    quantity: outboundRequest.quantity,
  });
  console.log(JSONdata);
  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${API_INFO.OUTBOUND(outboundRequest.productId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default createOutboundRequest;
