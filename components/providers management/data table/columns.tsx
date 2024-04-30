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
export type Provider = {
  id: string;
  providerName: string;
};

export const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "providerName",
    header: "Name",
  },
  {
    header: "actions",
    cell: ({ row }) => {
      const zone = row.original;

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
              onClick={() => navigator.clipboard.writeText(zone.id)}
            >
              Copy Provider ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Provider Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
