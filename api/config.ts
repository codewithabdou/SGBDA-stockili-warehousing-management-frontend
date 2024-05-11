const API_INFO = {
  BASE_URL: "http://localhost:5000",
  ZONES: "/zones",
  PROVIDERS: "/providers",
  PRODUCTS: "/products",
  INBOUND: (productId: string) => `products/${productId}/inbound`,
  OUTBOUND: (productId: string) => `products/${productId}/outbound`,
  SUMMARIZED_HISTORY: (productId: string) =>
    `products/${productId}/history/summary`,
  DETAILED_HISTORY: (productId: string) =>
    `products/${productId}/history/detailed`,
};

export default API_INFO;
