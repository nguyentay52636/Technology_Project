
import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import { productApi } from "@/apis/productApi"


export default async function Page() {
    const products = await productApi.getProducts()

    return (
        <main className="min-h-screen bg-background">
            <Hero />
            <Features />
            <FeaturedProductsSection products={products} />
            
        </main>
    );
}