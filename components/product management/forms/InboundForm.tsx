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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Product, Zone } from "@typings/entities";

const numbersRegEx = /^[0-9]*$/;

const FormSchema = z.object({
  quantities: z.array(
    z.string().regex(numbersRegEx, {
      message: "Quantity must be a number",
    })
  ),
});

const InboundForm = ({ product }: { product: Product }) => {
  const zones: Zone[] = [
    {
      id: 1,
      zoneName: "Zone A",
    },
    {
      id: 2,
      zoneName: "Zone B",
    },
    {
      id: 3,
      zoneName: "Zone C",
    },
    {
      id: 4,
      zoneName: "Zone D",
    },
  ];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantities: zones.map(() => "0"),
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Create Inbound request
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-sm w-[95%]  ">
        <DialogHeader>
          <DialogTitle>Create Inbound request</DialogTitle>
          <DialogDescription>
            Here you can create a new inbound request for{" "}
            <span className="font-bold">{product.productName} </span>
            filling in the form below the quantity in each zone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex flex-wrap justify-around gap-6 ">
              {zones.map((zone, index) => (
                <FormField
                  key={zone.id}
                  control={form.control}
                  name={`quantities.${index}`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-2/5">
                      <FormLabel>{zone.zoneName}</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <DialogFooter className="sm:justify-around gap-6">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" variant="secondary">
                Create Inbound
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InboundForm;
