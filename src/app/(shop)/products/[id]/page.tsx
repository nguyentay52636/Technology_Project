import Link from "next/link";
import { notFound } from "next/navigation";
import { productApi } from "@/apis/productApi";
import ProductImageGallery from "./ProductImageGallery";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  try {
    const product = await productApi.getProductById(id);

    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          ← Quay lại danh sách sản phẩm
        </Link>

        <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <ProductImageGallery
            title={product.title}
            thumbnail={product.thumbnail}
            images={product.images}
          />

          <div className="flex flex-col">
            <p className="text-sm uppercase tracking-wide text-slate-500">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.title}</h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
                ⭐ {product.rating}
              </span>
              <span>Còn lại {product.stock} sản phẩm</span>
            </div>

            <p className="mt-6 text-2xl font-bold text-blue-600">{product.price.toLocaleString("vi-VN")} $</p>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white md:w-fit"
            >
              Thêm vào giỏ hàng
            </button>

            {product.brand?.trim() && (
              <p className="mt-2 text-sm italic text-slate-500">Thương hiệu: {product.brand}</p>
            )}

            <p className="mt-6 leading-relaxed text-slate-700">{product.description}</p>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p>Bảo hành: {product.warrantyInformation || "Đang cập nhật"}</p>
              <p>Vận chuyển: {product.shippingInformation || "Đang cập nhật"}</p>
              <p>Tình trạng: {product.availabilityStatus || "Đang cập nhật"}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900">Đánh giá khách hàng</h2>

              {product.reviews?.length ? (
                <div className="mt-4 space-y-3">
                  {product.reviews.map((review, index) => (
                    <div
                      key={`${review.reviewerEmail}-${index}`}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-800">{review.reviewerName}</p>
                        <span className="text-xs text-slate-500">
                          {new Date(review.date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-amber-600">⭐ {review.rating}/5</p>
                      <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">Sản phẩm này chưa có đánh giá nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
