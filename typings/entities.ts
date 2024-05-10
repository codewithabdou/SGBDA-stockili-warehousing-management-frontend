export type Product = {
  id: number;
  name: string;
  description: string;
  cost: number;
  quantity: number;
  height: number;
  length: number;
  weight: number;
  width: number;
  provider: Provider;
};

export type Provider = {
  id: number;
  name: string;
  createdAt: Date;
};

export type Zone = {
  id: number;
  name: string;
};
