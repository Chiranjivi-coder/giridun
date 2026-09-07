import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { ProductDetailView } from "@/components/shop/ProductDetailView";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  return {
    title: product?.name ?? "Product Details",
    description: product ? `${product.name} - ₹${product.price}. Giridhan Organics.` : undefined,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
