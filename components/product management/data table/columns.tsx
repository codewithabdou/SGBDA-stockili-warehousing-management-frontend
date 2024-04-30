"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { HiDotsHorizontal } from "react-icons/hi";
import DetailedProductHistory from "../history/DetailedProductHistory";
import SummarizedProductHistory from "../history/SummarizedProductHistory";

export type Product = {
  id: string;
  productName: string;
  cost: number;
  quantity: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productName",
    header: "Name",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    header: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <HiDotsHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SummarizedProductHistory />
            <DetailedProductHistory />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
