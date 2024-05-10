"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
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
import { Input } from "@/components/ui/input";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";

const floatRegex = /^(\d{1,8}(\.\d{0,2})?|100000000(\.00?)?)$/;

const FormSchema = z.object({
  productName: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  providerId: z.string().min(3, {
    message: "Provider must be selected.",
  }),
  cost: z
    .string()
    .min(3, {
      message: "Cost is required.",
    })
    .regex(floatRegex, {
      message: "Cost must be a number.",
    }),
  desciption: z.string().min(3, {
    message: "Description is required.",
  }),
  height: z
    .string()
    .min(3, {
      message: "Height is required.",
    })
    .regex(floatRegex, {
      message: "Height must be a number.",
    }),
  width: z
    .string()
    .min(3, {
      message: "Width is required.",
    })
    .regex(floatRegex, {
      message: "Width must be a number.",
    }),
  length: z
    .string()
    .min(3, {
      message: "Length is required.",
    })
    .regex(floatRegex, {
      message: "Length must be a number.",
    }),
  weight: z
    .string()
    .min(3, {
      message: "Weight is required.",
    })
    .regex(floatRegex, {
      message: "Weight must be a number.",
    }),
});

export function CreateProduct() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      providerId: "",
      cost: "",
      desciption: "",
      height: "",
      width: "",
      length: "",
      weight: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create New Product <IoMdAddCircleOutline className="ml-2" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm w-[95%] custom-scrollbar  overflow-auto  h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create new product</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new product.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel className="text-white">Provider</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Provider A" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Provider A</SelectItem>
                        <SelectItem value="2">Provider B</SelectItem>
                        <SelectItem value="3">Provider C</SelectItem>
                        <SelectItem value="4">Provider D</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-secondary" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6 flex-col lg:flex-row w-full">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Length</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="desciption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-around gap-6">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Create product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
