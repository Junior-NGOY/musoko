"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
//import { useToast } from "@/hooks/use-toast";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/db/models/product.model";
//import { UploadButton } from "@/lib/uploadthing";
import { ProductInputSchema, ProductUpdateSchema } from "@/lib/validator";
import { Checkbox } from "@/components/ui/checkbox";
import { toSlug } from "@/lib/utils";
import { IProductInput } from "@/types";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { categories } from "@/lib/constants";

const productDefaultValues: IProductInput =
  process.env.NODE_ENV === "development"
    ? {
        name: "Sample Product",
        slug: "sample-product",
        category: "Sample Category",
        images: [],
        brand: "Sample Brand",
        description: "This is a sample description of the product.",
        price: 99.99,
        listPrice: 0,
        countInStock: 15,
        numReviews: 0,
        avgRating: 0,
        numSales: 0,
        isPublished: false,
        tags: [],
        sizes: [],
        colors: [],
        ratingDistribution: [],
        reviews: []
      }
    : {
        name: "",
        slug: "",
        category: "",
        images: [],
        brand: "",
        description: "",
        price: 0,
        listPrice: 0,
        countInStock: 0,
        numReviews: 0,
        avgRating: 0,
        numSales: 0,
        isPublished: false,
        tags: [],
        sizes: [],
        colors: [],
        ratingDistribution: [],
        reviews: []
      };

const ProductForm = ({
  type,
  product,
  productId
}: {
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
}) => {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("");
  const t = useTranslations('Admin');
  const tc = useTranslations('Categories');
  // Fonction pour filtrer les catégories
 /*  const filteredCategories = categories.filter((category) =>
    tc(category.name).toLowerCase().includes(categoryFilter.toLowerCase())
  ); */
  const filteredCategories = categories.filter((category) =>
    tc(category.name).toLowerCase().includes(categoryFilter.toLowerCase()) ||
    category.subcategories.some(subcategory => 
      tc(subcategory).toLowerCase().includes(categoryFilter.toLowerCase())
    )
  );
  const form = useForm<IProductInput>({
    resolver:
      type === "Update"
        ? zodResolver(ProductUpdateSchema)
        : zodResolver(ProductInputSchema),
    defaultValues: product && type === "Update" ? product : productDefaultValues
  });
  async function onSubmit(values: IProductInput) {
    if (type === "Create") {
      const res = await createProduct(values);
      if (!res.success) {
        toast.warning("Echec !");
      } else {
        toast.success("Succès !");
        router.push(`/admin/products`);
      }
    }
    if (type === "Update") {
      if (!productId) {
        router.push(`/admin/products`);
        return;
      }
      const res = await updateProduct({ ...values, _id: productId });
      if (!res.success) {
        toast.success("Echec");
      } else {
        router.push(`/admin/products`);
      }
    }
  }
  //const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const images = form?.watch("images");
  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data
      });

      if (!uploadRequest.ok) {
        throw new Error(`HTTP error! status: ${uploadRequest.status}`);
      }

      const response = await uploadRequest.json();

      if (response.error) {
        throw new Error(response.error);
      }

      form.setValue("images", [...images, response.url]);
      toast.success("Image uploaded successfully");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Trouble uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageUrl: string) => {
    try {
      // Extraire le hash de l'URL
      const hash = imageUrl.split("/").pop();
      if (!hash) throw new Error("Invalid image URL");

      const deleteRequest = await fetch(`/api/files/${hash}`, {
        method: "DELETE"
      });

      if (!deleteRequest.ok) {
        const errorData = await deleteRequest.json();
        throw new Error(errorData.error || "Failed to delete file");
      }

      const newImages = images.filter((img: string) => img !== imageUrl);
      form.setValue("images", newImages);
      toast.success("Image deleted successfully");
    } catch (e) {
      console.error("Delete error:", e);
      toast.error(e instanceof Error ? e.message : "Trouble deleting file");
    }
  };

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter product slug"
                      className="pl-8"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue("slug", toSlug(form.getValues("name")));
                      }}
                      className="absolute right-2 top-2.5"
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t('Category')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select a category')}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="p-2">
                      <Input
                        placeholder={t('Search category')}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                            {tc(category.name)}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-muted-foreground">
                         {t('No categories found')}
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>{t('Category')}</FormLabel>
      <Select
        //onValueChange={field.onChange}
        //defaultValue={field.value}

        onValueChange={(value) => {
          const subcategory = value.split('/')[1];
          field.onChange(subcategory);
        }}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={t('Select a category')} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder={t('Search category')}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mb-2"
            />
          </div>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <SelectGroup key={category.name}>
                <SelectLabel className="font-bold">
                  {tc(category.name)}
                </SelectLabel>
                {category.subcategories.map((subcategory) => (
                  <SelectItem 
                    key={`${category.name}-${subcategory}`} 
                    value={`${category.name}/${subcategory}`}
                  >
                    {tc(subcategory)}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          ) : (
            <div className="p-2 text-center text-muted-foreground">
              {t('No categories found')}
            </div>
          )}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

        {/*   <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product brand" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="listPrice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>List Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product list price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Net Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countInStock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Count In Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product count in stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="space-y-2 mt-2 min-h-48">
                    <div className="flex justify-start items-center space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="product image"
                          className="w-20 h-20 object-cover object-center rounded-sm"
                          width={100}
                          height={100}
                        />
                      ))}

                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            console.log("Files uploaded res...", res);
                            console.log("Files res...", res[0].url);
                            form.setValue("images", [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: "destructive",
                              description: `ERROR! ${error.message}`
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>

                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="space-y-4 mt-2 min-h-48">
                    <div className="flex flex-wrap gap-4">
                      {images.map((image: string) => (
                        <div key={image} className="relative group">
                          <Image
                            src={image}
                            alt="product image"
                            className="w-24 h-24 object-cover object-center rounded-md"
                            width={100}
                            height={100}
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete(image)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                //toast.error("File size should be less than 5MB");
                                return;
                              }
                              uploadFile(file);
                            }
                          }}
                          disabled={uploading}
                        />
                        {uploading && (
                          <div className="text-sm text-muted-foreground">
                            Uploading...
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="space-x-2 items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Is Published?</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Product `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
