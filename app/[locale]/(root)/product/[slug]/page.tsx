import { Card, CardContent } from "@/components/ui/card";
import {
  getProductBySlug,
  getRelatedProductsByCategory
} from "@/lib/actions/product.actions";

import SelectVariant from "@/components/shared/product/select-variant";
import ProductPrice from "@/components/shared/product/product-price";
import ProductGallery from "@/components/shared/product/product-gallery";
import { Separator } from "@/components/ui/separator";
import ProductSlider from "@/components/shared/product/product-slider";
import Rating from "@/components/shared/product/rating";
import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
//import AddToCart from "@/components/shared/product/add-to-card";
//import { generateId, round2 } from "@/lib/utils";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
 
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description
  };
}

export default async function ProductDetails(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string; color: string; size: string }>;
}) {
  const searchParams = await props.searchParams;

  const { page, color, size } = searchParams;

  const params = await props.params;

  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  // Filter out empty image strings
  const validImages = product.images?.filter(img => img && img.trim() !== "") || [];
 
  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product._id,
    page: Number(page || "1")
  });
  const t = await getTranslations('Product')
  const tc = await getTranslations('Categories')
  return (
    <div>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5  ">
          <div className="col-span-2">
            <ProductGallery images={validImages} />
          </div>

          <div className="flex w-full flex-col gap-2 md:p-5 col-span-2">
            <div className="flex flex-col gap-3">
              <p className="p-medium-16 rounded-full bg-grey-500/10   text-grey-500">
              {t('Brand')}: {product.brand} - {tc(product.category)} 
              </p>
              <h1 className="font-bold text-lg lg:text-xl">{product.name}</h1>
              <div className="flex items-center gap-2">
                <span>{product.avgRating.toFixed(1)}</span>
                <Rating rating={product.avgRating} />
               
                <span>{t('numReviews ratings', { numReviews: product.numReviews })}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <ProductPrice
                    price={product.price}
                    listPrice={product.listPrice}
                    isDeal={product.tags.includes("todays-deal")}
                    forListing={false}
                  />
                </div>
              </div>
            </div>
            <div>
              <SelectVariant
                product={product}
                size={size || product.sizes[0]}
                color={color || product.colors[0]}
              />
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">{t('Description')}:</p>
              <p className="p-medium-16 lg:p-regular-18">
                {product.description}
              </p>
            </div>
          </div>
          <div>
            <Card>
              <CardContent className="p-4 flex flex-col  gap-4">
                <ProductPrice price={product.price} />

                {product.countInStock > 0 && product.countInStock <= 3 && (
                  <div className="text-destructive font-bold">
                    {t('Only left in stock', { count: product.countInStock })}
                  </div>
                )}
                {product.countInStock !== 0 ? (
                  <div className="text-green-700 text-xl">{t('In Stock')}</div>
                ) : (
                  <div className="text-destructive text-xl">{t('Out of Stock')}</div>
                )}
                      {/* Ajoutez le bouton WhatsApp ici */}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              asChild
            >
              <a
               href={createWhatsAppLink(
                "243853222299", 
                product.name, 
                validImages[0], // Première image du produit
                product.price
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Contact Seller')}
              >
                <MessageCircle className="h-5 w-5" />
                {t('Contact Seller')}
              </a>
            </Button>
             {/*        {product.countInStock !== 0 && (
                  <div className='flex justify-center items-center'>
                    <AddToCart
                      item={{
                        clientId: generateId(),
                        product: product._id,
                        countInStock: product.countInStock,
                        name: product.name,
                        slug: product.slug,
                        category: product.category,
                        price: round2(product.price),
                        quantity: 1,
                        image: product.images[0],
                        size: size || product.sizes[0],
                        color: color || product.colors[0],
                      }}
                    />
                  </div>
                )} */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <ProductSlider
          products={relatedProducts.data}
          title={t('Best Sellers in', { name: tc(product.category) })}
        />
      </section>
      <section>
        <BrowsingHistoryList className="mt-10" />
      </section>
    </div>
  );
}
