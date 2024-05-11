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
import { create } from "domain";
import createZone from "@api/createZone";
import { useState } from "react";

const FormSchema = z.object({
  zoneName: z.string().min(3, {
    message: "Zone name must be at least 3 characters.",
  }),
});

export function CreateZone() {
  const [isSending, setIsSending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zoneName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSending(true);
    createZone(data)
      .then((response) => {
        window.location.reload();
        toast({
          title: "Zone created successfully",
          description: `The zone ${data.zoneName} has been created successfully.`,
        });
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occurred while creating the zone.",
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
          Create New Zone <IoMdAddCircleOutline className="ml-2" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new zone</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new zone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="zoneName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Zone A" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the zone that will be created.
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
                {isSending ? "Creating zone..." : "Create zone"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
