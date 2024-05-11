"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react";
import createProvider from "@api/createProvider";

const FormSchema = z.object({
  providerName: z.string().min(3, {
    message: "Provider name must be at least 3 characters.",
  }),
});

export function CreateProvider() {
  const [isSending, setIsSending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      providerName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSending(true);
    createProvider(data)
      .then((response) => {
        toast({
          title: "Provider created successfully",
          description: `The provider ${data.providerName} has been created successfully.`,
        });
        window.location.reload();
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occurred while creating the provider.",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create New Provider{" "}
          <IoMdAddCircleOutline className="ml-2" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new provider</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new provider.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="providerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Provider A" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the provider that will be created.
                  </FormDescription>
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
              <Button
                disabled={isSending}
                className={`${
                  isSending ? "cursor-not-allowed bg-opacity-70" : ""
                }`}
                type="submit"
              >
                {isSending ? "Creating..." : "Create Provider"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
