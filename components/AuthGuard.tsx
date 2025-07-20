"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/sidebar";
import { ProductSidebar } from "@/components/product-sidebar";
import { ServiceSidebar } from "@/components/service-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [checked, setChecked] = useState(false);
  const [businessType, setBusinessType] = useState("product");
  const [businessCategory, setBusinessCategory] = useState("coffee");

  // Check auth status on mount and when pathname changes
  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuth") === "true";
      const type = localStorage.getItem("businessType") || "product";
      const category = localStorage.getItem("businessCategory") || "coffee";
      setIsAuth(authStatus);
      setBusinessType(type);
      setBusinessCategory(category);
      setChecked(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!checked) return;

    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
    const isPublicRoute = publicRoutes.includes(pathname);

    // If not authenticated and not on a public route, redirect to login
    if (!isAuth && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    // If authenticated and on a public route, redirect to appropriate portal
    if (isAuth && isPublicRoute) {
      router.replace(businessType === "service" ? "/service" : "/product");
      return;
    }

    // If authenticated and on root path, redirect to appropriate portal
    if (isAuth && pathname === "/") {
      router.replace(businessType === "service" ? "/service" : "/product");
      return;
    }
  }, [isAuth, checked, pathname, router, businessType]);

  // Show loading while checking auth
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Public routes
  const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProductPublic = pathname.startsWith("/product");
  const isServicePublic = pathname.startsWith("/service");

  // Allow non-authenticated users to access /product/* and /service/*
  if (!isAuth && (isProductPublic || isServicePublic)) {
    return <>{children}</>;
  }

  // Show login/signup/forgot-password pages if not authenticated and on a public route
  if (checked && !isAuth && isPublicRoute) {
    return <>{children}</>;
  }

  // Show dashboard with appropriate sidebar if authenticated and not on a public route
  if (checked && isAuth && !isPublicRoute) {
    const isProductPortal = pathname.startsWith("/product") || (pathname === "/" && businessType === "product");
    const isServicePortal = pathname.startsWith("/service") || (pathname === "/" && businessType === "service");
    let SidebarComponent = AppSidebar; // Default fallback
    if (isProductPortal) {
      SidebarComponent = ProductSidebar;
    } else if (isServicePortal) {
      SidebarComponent = ServiceSidebar;
    }
    return (
      <SidebarProvider>
        <SidebarComponent />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    );
  }

  // Show loading while redirecting or in any other ambiguous state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
} 