"use client";

import { AIChat } from "@/components/ai-chat";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function AIChatPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] flex-1">
      <AIChat fullPage />
    </div>
  );
} 