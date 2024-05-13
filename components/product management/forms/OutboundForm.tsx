import React from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Product } from "@typings/entities";
import createOutboundRequest from "@api/createOutboundRequest";
import { toast } from "@components/ui/use-toast";
import { title } from "process";

const numbersRegEx = /^[0-9]*$/;

const FormSchema = z.object({
  quantity: z.string().regex(numbersRegEx, {
    message: "Quantity must be a number",
  }),
});

const OutboundForm = ({ product }: { product: Product }) => {
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setIsSending(true);
    createOutboundRequest({
      productId: product.id.toString(),
      quantity: parseInt(values.quantity),
    })
      .then(() => {
        toast({
          title: "Outbound request created",
          description: "The outbound request was successfully created",
        });
        form.reset();
        window.location.reload();
      })
      .catch((error) => {
        toast({
          title: "Failed to create outbound request",
          description: error.message,
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Create Outbound request
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-sm w-[95%]  ">
        <DialogHeader>
          <DialogTitle>Create Outbound request</DialogTitle>
          <DialogDescription>
            Here you can create a new outbound request for{" "}
            <span className="font-bold">{product.name} </span>
            filling in the form below the quantity to be retrieved.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex flex-wrap justify-around gap-6 ">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Outbound Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the quantity of the product to be retrieved.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-around gap-6">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isSending}
                className={`
              ${isSending ? "animate-pulse" : ""}`}
                type="submit"
                variant="secondary"
              >
                {isSending ? "Creating..." : "Create Outbound request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OutboundForm;
