"use client"

import { Building2, FileText, Home, Package, Settings, Truck, Users, Wallet, MoreHorizontal, Crown, Bot, Package2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AIChat } from "@/components/ai-chat"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Truck,
  },
  {
    title: "Manage Store",
    url: "/manage-store",
    icon: Building2,
  },
  {
    title: "Departments",
    url: "/departments",
    icon: Users,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: Wallet,
  },
  {
    title: "System Utils",
    url: "/others",
    icon: MoreHorizontal,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "AI Chat",
    url: "/ai-chat",
    icon: Bot,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [showUpgrade, setShowUpgrade] = useState(false)

  return (
    <>
    <Sidebar className="border-r w-[200px] bg-sidebar text-sidebar-foreground dark:bg-sidebar dark:text-sidebar-foreground">
      <SidebarHeader className="p-4 border-b border-sidebar-border dark:border-sidebar-border bg-sidebar dark:bg-sidebar">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 shadow-lg">
            <Package2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">Stoka</span>
            <span className="text-xs text-muted-foreground">Inventory Management</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} className="w-full h-[2.5rem] justify-start">
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 dark:from-amber-950/50 dark:to-orange-950/50 dark:border-amber-800">
          <CardContent className="p-4 text-center">
            <div className="mb-3">
                <Crown className="h-8 w-8 mx-auto text-amber-600 dark:text-amber-400" />
            </div>
              <h3 className="font-semibold text-sm mb-1 text-amber-800 dark:text-amber-200">Upgrade to Premium</h3>
            <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                Unlock advanced features, priority support, and exclusive tools by upgrading to Stoka Premium.
            </p>
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg" onClick={() => setShowUpgrade(true)}>
                Upgrade Now
              </Button>
          </CardContent>
        </Card>
      </SidebarFooter>
    </Sidebar>
    <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            Upgrade to Stoka Premium
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 text-center">
          <p className="text-base font-semibold mb-2">Supercharge your business!</p>
          <ul className="text-sm text-gray-700 mb-4 space-y-1 text-left mx-auto max-w-xs">
            <li>• Advanced analytics and reporting</li>
            <li>• Priority customer support</li>
            <li>• Early access to new features</li>
            <li>• Custom integrations</li>
            <li>• And much more...</li>
          </ul>
          <p className="text-xs text-gray-500">Contact our sales team to discuss your needs and get a personalized offer.</p>
        </div>
        <DialogFooter className="flex flex-col gap-2">
          <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white" onClick={() => { setShowUpgrade(false); window.location.href = 'mailto:sales@stoka.com?subject=Upgrade%20to%20Premium'; }}>
            Contact Sales
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setShowUpgrade(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}
