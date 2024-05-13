import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@components/ui/button";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import getSummarizedHistory from "@api/getSummarizedHistory";

const SummarizedProductHistory = ({ productId }: { productId: string }) => {
  const [productHistory, setProductHistory] = useState([]);

  const historyCases = {
    in: {
      icon: (
        <IoIosLogIn
          size={25}
          className="bg-green-400 translate-y-7 -translate-x-9 rounded-full p-1 text-green-900"
        />
      ),
    },
    out: {
      icon: (
        <IoIosLogOut className="bg-red-400 translate-y-7 -translate-x-9 rounded-full p-1 text-red-900" />
      ),
    },
  };

  useEffect(() => {
    const fetchProductHistory = async () => {
      const history = await getSummarizedHistory({ productId });
      const reversedHistory = history.reverse();
      setProductHistory(reversedHistory);
    };

    fetchProductHistory();
  }, [productId]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          View Product Summarized History
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-sm w-[95%] custom-scrollbar  overflow-auto  h-[90vh]">
        <DialogHeader>
          <DialogTitle>Product Summarized History</DialogTitle>
          <DialogDescription>
            Here you can see the product detailed history timeline.
          </DialogDescription>
        </DialogHeader>

        <div>
          <ol className="relative border-s  border-gray-200 dark:border-gray-700">
            {productHistory.length &&
              productHistory.map(
                (
                  historyItem: {
                    createdAt: string;
                    type: "in" | "out";
                    quantity: number;
                    product: { id: number; name: string };
                  },
                  index
                ) => (
                  <li key={index} className="mb-10 ms-6">
                    {historyCases[historyItem.type].icon}
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {historyItem.type === "in" ? "Inbound" : "Outbound"} of{" "}
                      {historyItem.quantity}
                      {!index && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                          Latest
                        </span>
                      )}
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Created at{" "}
                      {new Date(historyItem.createdAt).toLocaleString()}
                    </time>
                  </li>
                )
              )}
          </ol>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SummarizedProductHistory;
