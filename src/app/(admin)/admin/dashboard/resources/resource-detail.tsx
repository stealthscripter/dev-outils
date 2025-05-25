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
import { z } from "zod";
import { schema } from "./resource-table";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ResourceEditSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
  slug: z.string().optional(),
  categoryId: z.string().optional(),
  description: z.string().nullable(),
  icon: z
    .union([
      z.custom<File>((val) => val instanceof File),
      z.string().url("Icon URL must be valid").nullable(),
    ])
    .optional(),
});

export type ResourceEditInputs = z.infer<typeof ResourceEditSchema>;

export default function ResourceDetail({
  item,
}: {
  item: z.infer<typeof schema>;
}) {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResourceEditInputs>({
    resolver: zodResolver(ResourceEditSchema),
    defaultValues: {
      name: item.name,
      url: item.url,
      slug: item.slug,
      description: item.description,
    },
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

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIconFile(file);
    setValue("icon", file);
  };

  const onSubmit = async (data: ResourceEditInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", data.name || item.name);
      formData.append("url", data.url || item.url);
      formData.append("slug", data.slug || item.slug);
      formData.append("categoryId", data.categoryId || item.categoryId);
      formData.append(
        "description",
        data.description || item.description || ""
      );
      if (data.icon instanceof File) {
        formData.append("icon", data.icon);
      }
      const res = await fetch("/api/website", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update");
      toast.success("Success!", {
        description: "Resource has been edited successfully.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!", {
        description: "Failed to add resource. Please try again.",
      });
    } finally { 
      setLoading(false);
    }
  };

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="url">URL</Label>
                <Input id="url" {...register("url")} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register("slug")} disabled />

                <p className="text-xs text-muted-foreground mt-1 lowercase">
                  Auto-generated from name. Edit the name to update the slug.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="icon">Icon (optional)</Label>
              <Input
                id="icon"
                type="file"
                onChange={handleIconChange}
                accept="image/*"
              />
              {item.iconUrl ? (
                <div className="mt-2 space-y-4">
                  <span>old image</span>
                  <img
                    src={item.iconUrl}
                    alt="Icon preview"
                    className="h-12 w-12 object-cover rounded mt-1"
                  />
                </div>
              ) : (
                <p className="text-sm text-lime-500 ms-2">
                  No Icon Uploaded Before !(please upload)
                </p>
              )}

              {iconFile && (
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={URL.createObjectURL(iconFile)}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {iconFile.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setIconFile(null);
                      setValue("icon", null);
                      const fileInput = document.getElementById(
                        "icon"
                      ) as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    &times;
                  </Button>
                </div>
              )}
            </div>

            <DrawerFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
