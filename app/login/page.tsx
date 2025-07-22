"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Mail, Lock } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portalType, setPortalType] = useState("product");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-inventory-50 to-amber-100 px-2 light">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-inventory-100">
        <div className="flex flex-col items-center mb-4">
          <div className="h-16 w-16 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-inventory-600 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
            <Package className="h-9 w-9 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-inventory-700 to-amber-700 bg-clip-text text-transparent">Sign in to Stoka</h1>
          <p className="text-inventory-600 text-sm font-medium">Inventory Management System</p>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!email || !password) {
            alert("Please fill in all fields");
            return;
          }
          setIsLoading(true);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userPortal", portalType);
          setIsLoading(false);
          window.location.href = portalType === "service" ? "/service" : "/product";
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="you@email.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Portal</label>
            <Select value={portalType} onValueChange={setPortalType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product Portal</SelectItem>
                <SelectItem value="service">Service Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-inventory-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-inventory-600 to-amber-600 hover:from-inventory-700 hover:to-amber-700 text-lg py-3 font-semibold shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-inventory-600 hover:underline font-medium">Sign up</Link>
        </div>
        <footer className="w-full border-t border-border bg-white text-foreground/80 py-4 px-2 flex flex-col items-center justify-center gap-2 mt-4 shadow-inner z-20">
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-inventory-700 to-amber-700 bg-clip-text text-transparent">Stoka</span>
          <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
} 