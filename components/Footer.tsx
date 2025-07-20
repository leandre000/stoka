import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/80 dark:bg-background/90 text-foreground/80 dark:text-foreground/80 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto shadow-inner z-20">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Stoka</span>
        <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <a href="/about" className="hover:underline hover:text-primary transition-colors">About</a>
        <a href="/privacy" className="hover:underline hover:text-primary transition-colors">Privacy</a>
        <a href="/terms" className="hover:underline hover:text-primary transition-colors">Terms</a>
        <a href="mailto:support@stoka.com" className="hover:underline hover:text-primary transition-colors">Contact</a>
      </div>
    </footer>
  );
} 