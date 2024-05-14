import { CreateProduct } from "@components/product management/forms/CreateProductForm";
import ProductsTable from "@components/product management/data table/products";
import React from "react";

const ProductsPage = () => {
  return (
    <div className="w-full">
      <div className="flex gap-6 flex-wrap justify-between mt-6 items-center">
        <h1 className="md:text-3xl text-2xl  font-bold ">
          Products Management
        </h1>
        <CreateProduct />
      </div>
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
