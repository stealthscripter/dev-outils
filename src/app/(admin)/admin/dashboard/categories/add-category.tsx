"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ResourceSchema = z.object({
  name: z.string().min(1, "website name is required"),
  slug: z.string().min(1, "website slug is required"),
});

export type ResourceInput = z.infer<typeof ResourceSchema>;

export default function AddCategoryViewer() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResourceInput>({
    resolver: zodResolver(ResourceSchema),
  });

  const name = watch("name");

  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      setValue("slug", generatedSlug);
    } else {
      setValue("slug", "");
    }
  }, [name, setValue]);

  const onSubmit = async (data: ResourceInput) => {
    setLoading(true);

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to add category");
      } else {
        toast.success("Success!", { description: "Category added!" });
        reset();
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Something went wrong!", {
        description: "Failed to add category. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="text-foreground w-fit px-2 text-left"
        >
          <IconPlus />
          <span>Add Category</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Add Resource</DrawerTitle>
          <DrawerDescription>
            Fill out the details below to add a new resource.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                {...register("slug")}
                disabled
                className="border"
              />
              {errors.slug && (
                <p className="text-red-500 text-xs">{errors.slug.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1 lowercase">
                Auto-generated from name. Edit the name to update the slug.
              </p>
            </div>

            <DrawerFooter className="">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" type="button">
                  Done
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
