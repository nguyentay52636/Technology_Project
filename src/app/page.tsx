"use client"

import HomePage from "@/components/Home/HomePage";
import { useProduct } from "@/hooks/useProduct";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading } = useProduct();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowContent(true);
    }
  }, [loading]);

  if (!showContent) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center bg-background">
        <Spinner className="h-10 w-10 text-primary" />
        <p className="mt-4 text-sm font-medium animate-pulse text-muted-foreground">
          load trang...
        </p>
      </div>
    );
  }

  return (
    <>
      <HomePage />
    </>
  );
}