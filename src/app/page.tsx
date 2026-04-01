

import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"

import { GridProduct } from "@/components/home/GridProduct"


export default async function Page() {

    return (
        <main className="min-h-screen bg-background">
            {/* Các component tĩnh không cần State */}
            <Hero />
            <Features />
            
            
        </main>
    );
}