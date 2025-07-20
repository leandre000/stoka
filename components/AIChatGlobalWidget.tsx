"use client";

import { AIChat } from "@/components/ai-chat";
import { usePathname } from "next/navigation";

export default function AIChatGlobalWidget() {
  const pathname = usePathname();
  const showAIChat = !["/ai-chat", "/product/ai-chat", "/service/ai-chat"].includes(pathname);
  return showAIChat ? <AIChat /> : null;
} 