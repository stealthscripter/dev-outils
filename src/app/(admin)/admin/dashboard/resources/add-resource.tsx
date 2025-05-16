"use client";
import { IconPlus } from "@tabler/icons-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

export const ResourceSchema = z.object({
    name: z.string().min(1, "website name is required"),
    url: z.string().url("website url must be valid include https://"),
    slug: z.string().min(1, "website slug is required"),
    categoryId: z.string().min(1, "website category is required"),
    description: z.string().nullable(),
    icon: z.union([
        z.custom<File>((val) => val instanceof File),
        z.string().url("Icon URL must be valid").nullable(),
    ]).optional(),
});

export type ResourceInput = z.infer<typeof ResourceSchema>;

export default function AddResourceViewer() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

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
    async function fetchCategories() {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
    }

    fetchCategories();
  }, []); // empty dependency array => runs once
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

  const onSubmit = async (data: ResourceInput) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("url", data.url);
    formData.append("slug", data.slug);
    formData.append("categoryId", data.categoryId);
    formData.append("description", data.description || "");
    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    }
    setLoading(true);
    try {
      const res = await fetch("/api/website", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to create resource");

      toast.success("Success!", {
        description: "Resource has been added.",
      });

      const result = await res.json();
      console.log("Resource saved:", result);
      reset();
      setCategories([])
      setIconFile(null)
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
        <Button
          variant="outline"
          className="text-foreground w-fit px-2 text-left"
        >
          <IconPlus />
          <span>Add Resource</span>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="url">URL</Label>
                <Input id="url" {...register("url")} />
                {errors.url && (
                  <p className="text-red-500 text-xs">{errors.url.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register("slug")} disabled />
                {errors.slug && (
                  <p className="text-red-500 text-xs">{errors.slug.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1 lowercase">
                  Auto-generated from name. Edit the name to update the slug.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="categoryId">Category</Label>
              <Select
                onValueChange={(value) =>
                  setValue("categoryId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger id="categoryId" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.categoryId && (
                <p className="text-red-500 text-xs">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div className="grid grid-cols-1 gap-3 mt-2">
              <Label htmlFor="icon">Resource Icon</Label>
              <Input
                id="icon"
                type="file"
                onChange={handleIconChange}
                accept="image/*"
              />
              {errors.icon && (
                <p className="text-red-500 text-xs">{errors.icon.message}</p>
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
