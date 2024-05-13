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
import { z } from "zod";
import { set, useForm } from "react-hook-form";
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
import getZones from "@api/getZones";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { v4 as uuidv4 } from "uuid";
import createInboundRequest from "@api/createInboundRequest";
import { toast } from "@/components/ui/use-toast";
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants";

const numbersGreaterThanZeroRegEx = /^[1-9]\d*$/;

const FormSchema = z.object({
  processedIn: z.string().min(1, {
    message: "Please select a processing method",
  }),
  zoneQuantities: z.array(
    z.object({
      zoneId: z.string(),
      quantity: z.string().regex(numbersGreaterThanZeroRegEx, {
        message: "Please enter a valid number",
      }),
    })
  ),
});

const InboundForm = ({ product }: { product: Product }) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [zoneNumber, setZoneNumber] = useState<number>(1);
  const [isSending, setIsSending] = useState<boolean>(false);
  useEffect(() => {
    const fetchZones = async () => {
      const zones = await getZones();
      setZones(zones);
    };

    fetchZones();
  }, []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      processedIn: "Data Layer",
      zoneQuantities: Array<{ zoneId: string; quantity: string }>(),
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setIsSending(true);
    const inboundRequest = {
      productId: product.id.toString(),
      zonesQuantities: values.zoneQuantities.map((zone) => ({
        zone_id: parseInt(zone.zoneId),
        quantity: parseInt(zone.quantity),
      })),
      processedIn: values.processedIn,
    };
    createInboundRequest(inboundRequest)
      .then((data) => {
        toast({
          title: "Inbound request created",
          description: `Inbound request for ${
            product.name
          } has been created successfully in ${(
            data.executionTime / 1000
          ).toFixed(2)} seconds`,
        });
        setZoneNumber(1);
        form.reset();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occurred while creating the inbound request",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const deleteZone = (index: number) => {
    if (zoneNumber > 1) {
      form.setValue(
        "zoneQuantities",
        form.getValues("zoneQuantities").filter((_, i) => i !== index)
      );
      setZoneNumber(zoneNumber - 1);
    }
  };

  const ZonesFields = Array.from({ length: zoneNumber }, (_, index) => (
    <div key={uuidv4()} className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1>Zone {index + 1} :</h1>
        <Button
          type="button"
          variant={"destructive"}
          onClick={(e) => deleteZone(index)}
        >
          Delete
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-center  gap-6">
        <FormField
          control={form.control}
          name={`zoneQuantities.${index}.zoneId`}
          render={({ field }) => (
            <FormItem className="w-full md:w-1/2">
              <FormLabel>Zone name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {zones &&
                    zones.map((zone, _) => (
                      <SelectItem key={zone.id} value={zone.id.toString()}>
                        {zone.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`zoneQuantities.${index}.quantity`}
          render={({ field }) => (
            <FormItem className="w-full md:w-1/2">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  ));

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
      <DialogContent className="sm:max-w-[500px] flex flex-col justify-between rounded-sm w-[95%] custom-scrollbar  overflow-auto  h-[90vh]  ">
        <DialogHeader>
          <DialogTitle>Create Inbound request</DialogTitle>
          <DialogDescription>
            Here you can create a new inbound request for{" "}
            <span className="font-bold">{product.name} </span>
            filling in the form below the quantity in each zone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 h-full"
          >
            <div className="w-full flex flex-wrap justify-around gap-6 ">
              <FormField
                control={form.control}
                name={`processedIn`}
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel>Processing method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a processing method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Data Layer">Data Layer</SelectItem>
                        <SelectItem value="Application Layer">
                          Application Layer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {ZonesFields}
            </div>
            <div className="flex w-full items-center md:px-6 justify-end">
              <Button
                type="button"
                onClick={() => {
                  setZoneNumber(zoneNumber + 1);
                }}
              >
                Add Zone
              </Button>
            </div>
            <DialogFooter className="sm:justify-around gap-6">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
              <Button
                className={`
              ${isSending ? "animate-pulse" : ""}`}
                type="submit"
                variant="secondary"
                disabled={isSending}
              >
                {isSending ? "Creating Inbound..." : "Create Inbound"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InboundForm;
