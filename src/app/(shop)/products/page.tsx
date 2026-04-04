// app/products/page.tsx
import { productApi } from "@/apis/productApi";
import ProductsClient from "@/components/Products/ProductsClient";

export default async function Page() {
  const products = await productApi.getProducts();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>
      <ProductsClient products={products} />
    </div>
  );
}