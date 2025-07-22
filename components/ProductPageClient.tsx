"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AuthGuard } from "@/components/AuthGuard";
import { Toaster } from "@/components/ui/sonner";
import { Bell, Search, Moon, ChevronDown, Plus, LogOut, Package, Truck, FileText, Bot, Settings, Users, Wallet, MoreHorizontal, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function ProductPageClient() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [businessCategory, setBusinessCategory] = useState("inventory");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [metricsData, setMetricsData] = useState([
    { date: "Jul 1", value: 120 },
    { date: "Jul 2", value: 150 },
    { date: "Jul 3", value: 170 },
    { date: "Jul 4", value: 140 },
    { date: "Jul 5", value: 180 },
    { date: "Jul 6", value: 200 },
    { date: "Jul 7", value: 220 },
  ]);

  const [supplierData] = useState([
    { name: "TechCorp", value: 35, color: "#0088FE" },
    { name: "SupplyMax", value: 25, color: "#00C49F" },
    { name: "GlobalParts", value: 20, color: "#FFBB28" },
    { name: "QualityFirst", value: 20, color: "#FF8042" },
  ]);

  const [recentProducts] = useState([
    { name: "Laptop Pro", stock: 45, price: "$1,299" },
    { name: "Wireless Mouse", stock: 120, price: "$29" },
    { name: "USB Cable", stock: 200, price: "$12" },
    { name: "Monitor 24\"", stock: 15, price: "$249" },
  ]);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    supplier: "",
    sku: ""
  });

  const defaultCategories = ["inventory", "retail", "manufacturing", "agriculture"];
  const isCustomCategory = !defaultCategories.includes(businessCategory);
  const [editingCategory, setEditingCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState(isCustomCategory ? businessCategory : "");

  const [user, setUser] = useState({ email: '', avatar: '' });

  useEffect(() => {
    const email = localStorage.getItem('userEmail') || localStorage.getItem('email') || '';
    const avatar = localStorage.getItem('userAvatar') || '';
    setUser({ email, avatar });
  }, []);

  const handleCustomCategorySave = () => {
    if (customCategory.trim()) {
      setBusinessCategory(customCategory.trim());
      localStorage.setItem("businessCategory", customCategory.trim());
      setEditingCategory(false);
    }
  };

  useEffect(() => {
    setMetricsLoading(true);
    const timer = setTimeout(() => setMetricsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const category = localStorage.getItem("businessCategory") || "inventory";
    setBusinessCategory(category);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPortal");
    window.location.href = "/login";
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.stock) {
      toast.error("Please fill in all required fields");
      return;
    }
    setTimeout(() => {
      toast.success("Product added successfully!");
      setShowAddProduct(false);
      setProductForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        supplier: "",
        sku: ""
      });
    }, 1000);
  };

  const upcomingTasks = [
    { title: "Complete Inventory Count", time: "Nov 20, 9:00 AM" },
    { title: "Supplier Meeting", time: "Nov 21, 12:00 PM" },
    { title: "Update Stock Levels", time: "Nov 22, 8:00 AM" },
    { title: "Generate Monthly Report", time: "Nov 23, 11:00 AM" },
  ];

  const teamMembers = [
    { name: "John", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Mike", avatar: "/placeholder.svg?height=32&width=32" },
  ];

  return (
    <AuthGuard>
      <TooltipProvider>
        <div className="flex-1 space-y-3 pt-6 px-4 pr-8 lg:pr-12">
          <DashboardHeader title="Product Dashboard">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full">
              <div className="relative flex-1 hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10 bg-gray-50 border-gray-200" aria-label="Search products" />
              </div>
              {/* User info to the right of search bar */}
              <div className="flex items-center space-x-2 ml-2">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder-user.jpg"} />
                  <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm truncate max-w-[120px]">{user.email ? user.email.split('@')[0] : "User"}</span>
              </div>
              {/* Notifications, theme, logout */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="View notifications" tabIndex={0}>
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-600">3</Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View notifications</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark") } aria-label="Toggle theme" tabIndex={0}>
                    <Moon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle light/dark mode</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogoutClick}
                    className="bg-red-100 hover:bg-red-200 rounded-full p-2 border border-red-300 shadow-md"
                    aria-label="Logout"
                    tabIndex={0}
                  >
                    <LogOut className="h-7 w-7 text-red-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </div>
          </DashboardHeader>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 lg:space-y-6">
              {/* Welcome Banner */}
              <Card className="bg-gradient-to-r from-inventory-600 to-amber-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h1 className="text-xl sm:text-2xl font-bold mb-2">
                        {isCustomCategory && !editingCategory ? (
                          <>
                            Welcome to <span className="inline-block px-2 py-1 rounded bg-white/10 text-yellow-200 font-semibold">{businessCategory}</span> Management System!
                            <Button
                              size="sm"
                              variant="ghost"
                              className="ml-2 text-xs text-yellow-200 hover:text-yellow-300 hover:bg-white/10 px-2 py-1"
                              onClick={() => setEditingCategory(true)}
                            >
                              Edit
                            </Button>
                          </>
                        ) : editingCategory ? (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <Input
                              value={customCategory}
                              onChange={e => setCustomCategory(e.target.value)}
                              className="w-full sm:w-auto px-2 py-1 text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded"
                              placeholder="Your product or business name"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1" onClick={handleCustomCategorySave}>Save</Button>
                              <Button size="sm" variant="ghost" className="text-white px-2 py-1" onClick={() => setEditingCategory(false)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <>Welcome to Product Management System!</>
                        )}
                      </h1>
                      <p className="text-inventory-100 mb-4">
                        {isCustomCategory ? (
                          <>Manage your <span className="font-semibold text-yellow-200">{businessCategory}</span> products and operations</>
                        ) : "Manage your product inventory, suppliers, and business operations"}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                          <DialogTrigger asChild>
                            <Button className="bg-inventory-600 hover:bg-inventory-700 text-white">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Product
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl">Add New Product</DialogTitle>
                              <DialogDescription>
                                Fill in the details below to add a new product to your inventory.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddProduct} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Product Name *</Label>
                                <Input
                                  id="name"
                                  value={productForm.name}
                                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                  placeholder="Enter product name"
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={productForm.description}
                                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                  placeholder="Enter product description"
                                  rows={3}
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="category">Category</Label>
                                  <Select value={productForm.category} onValueChange={(value) => setProductForm({ ...productForm, category: value })}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Electronics">Electronics</SelectItem>
                                      <SelectItem value="Furniture">Furniture</SelectItem>
                                      <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                                      <SelectItem value="Accessories">Accessories</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="price">Price *</Label>
                                  <Input
                                    id="price"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                    placeholder="Enter price"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="stock">Stock *</Label>
                                  <Input
                                    id="stock"
                                    type="number"
                                    value={productForm.stock}
                                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                    placeholder="Enter stock quantity"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="sku">SKU</Label>
                                  <Input
                                    id="sku"
                                    value={productForm.sku}
                                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                                    placeholder="Enter SKU"
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="supplier">Supplier</Label>
                                <Input
                                  id="supplier"
                                  value={productForm.supplier}
                                  onChange={(e) => setProductForm({ ...productForm, supplier: e.target.value })}
                                  placeholder="Enter supplier name"
                                />
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                                <Button type="submit" className="flex-1 bg-inventory-600 hover:bg-inventory-700">
                                  Add Product
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setShowAddProduct(false)}
                                  className="flex-1 sm:flex-none"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          className="border-inventory-600 text-inventory-600 hover:bg-inventory-50"
                          onClick={() => router.push('/product/reports')}
                        >
                          View Reports
                        </Button>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                                          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-inventory-500/20 rounded-lg flex items-center justify-center">
                      <Package className="w-12 h-12 lg:w-16 lg:h-16 text-inventory-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold">$12,450</p>
                        <p className="text-gray-600 text-sm">+12%</p>
                      </div>
                      <Button asChild variant="ghost" size="icon">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex flex-col space-y-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-4 text-sm sm:text-base">Total Revenue</h3>
                    <div className="h-20 sm:h-24">
                      {metricsLoading ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={metricsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Line type="monotone" dataKey="value" stroke="#d97706" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold">1,234</p>
                        <p className="text-gray-600 text-sm">+8%</p>
                      </div>
                      <Button asChild variant="ghost" size="icon">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex flex-col space-y-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-4 text-sm sm:text-base">Total Products</h3>
                    <div className="h-20 sm:h-24">
                      {metricsLoading ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={metricsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Bar dataKey="value" fill="#f59e0b" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">Product Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-56 lg:h-64">
                      {metricsLoading ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={metricsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Bar dataKey="value" fill="#d97706" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">Supplier Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-56 lg:h-64">
                      {metricsLoading ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={supplierData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {supplierData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Products */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-inventory-100 rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-inventory-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-sm sm:text-base truncate">{product.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500">Stock: {product.stock} units</p>
                          </div>
                        </div>
                        <div className="text-right ml-2">
                          <p className="font-medium text-sm sm:text-base">{product.price}</p>
                          <p className="text-xs sm:text-sm text-gray-500">Price</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <Button className="w-full bg-inventory-600 hover:bg-inventory-700" onClick={() => setShowAddProduct(true)}>
                    <Package className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push('/product/suppliers')}>
                    <Truck className="w-4 h-4 mr-2" />
                    Manage Suppliers
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push('/product/reports')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push('/product/ai-chat')}>
                    <Bot className="w-4 h-4 mr-2" />
                    AI Assistant
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-inventory-600 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.title}</p>
                          <p className="text-xs text-gray-500">{task.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium truncate">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TooltipProvider>
      <Toaster />
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will be redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-inventory-600 text-inventory-600 hover:bg-inventory-50">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-inventory-600 hover:bg-inventory-700 text-white"
            >
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthGuard>
  );
} 