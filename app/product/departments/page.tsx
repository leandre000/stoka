"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Package, Building2, MapPin, Phone, Mail, UserPlus, PackagePlus } from "lucide-react"
import { toast } from "sonner"

export default function DepartmentsPage() {
  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddTeam, setShowAddTeam] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null)

  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    location: "",
    manager: "",
    phone: "",
    email: "",
    description: ""
  })

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
    departmentId: ""
  })

  const [teamForm, setTeamForm] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    departmentId: ""
  })

  const [departments] = useState([
    {
      id: 1,
      name: "Coffee Farming Department",
      location: "Northern Region",
      manager: "John Smith",
      phone: "+250 788 123 456",
      email: "john.smith@coffee.com",
      description: "Manages coffee farming operations and field workers",
      products: [
        { id: 1, name: "Supreme Cherry Coffee", category: "Raw Coffee", quantity: "1000kg", price: "5000 FRW", supplier: "Local Farmers" },
        { id: 2, name: "Parchment Coffee", category: "Processed Coffee", quantity: "500kg", price: "3000 FRW", supplier: "Local Farmers" }
      ],
      team: [
        { id: 1, name: "Alice Johnson", position: "Field Supervisor", email: "alice@coffee.com", phone: "+250 788 234 567" },
        { id: 2, name: "Bob Wilson", position: "Harvest Manager", email: "bob@coffee.com", phone: "+250 788 345 678" }
      ]
    },
    {
      id: 2,
      name: "Coffee Processing Department",
      location: "Eastern Region",
      manager: "Sarah Davis",
      phone: "+250 788 456 789",
      email: "sarah.davis@coffee.com",
      description: "Handles coffee processing and quality control",
      products: [
        { id: 3, name: "Fully Washed Coffee", category: "Processed Coffee", quantity: "800kg", price: "8000 FRW", supplier: "Internal Processing" },
        { id: 4, name: "Green Coffee Beans", category: "Export Ready", quantity: "600kg", price: "12000 FRW", supplier: "Internal Processing" }
      ],
      team: [
        { id: 3, name: "Mike Brown", position: "Processing Manager", email: "mike@coffee.com", phone: "+250 788 567 890" },
        { id: 4, name: "Emma Wilson", position: "Quality Controller", email: "emma@coffee.com", phone: "+250 788 678 901" }
      ]
    },
    {
      id: 3,
      name: "Sales & Marketing Department",
      location: "Central Region",
      manager: "David Lee",
      phone: "+250 788 789 012",
      email: "david.lee@coffee.com",
      description: "Manages sales, marketing, and customer relations",
      products: [
        { id: 5, name: "Premium Coffee Blend", category: "Retail", quantity: "200kg", price: "15000 FRW", supplier: "Internal Blend" },
        { id: 6, name: "Coffee Gift Sets", category: "Gift Items", quantity: "50 sets", price: "25000 FRW", supplier: "Local Artisans" }
      ],
      team: [
        { id: 5, name: "Lisa Chen", position: "Sales Manager", email: "lisa@coffee.com", phone: "+250 788 890 123" },
        { id: 6, name: "Tom Anderson", position: "Marketing Specialist", email: "tom@coffee.com", phone: "+250 788 901 234" }
      ]
    }
  ])

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!departmentForm.name || !departmentForm.manager) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Department added successfully!")
    setShowAddDepartment(false)
    setDepartmentForm({ name: "", location: "", manager: "", phone: "", email: "", description: "" })
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productForm.name || !productForm.category || !productForm.departmentId) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Product added to department successfully!")
    setShowAddProduct(false)
    setProductForm({ name: "", category: "", quantity: "", price: "", supplier: "", departmentId: "" })
  }

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamForm.name || !teamForm.position || !teamForm.departmentId) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Team member added to department successfully!")
    setShowAddTeam(false)
    setTeamForm({ name: "", position: "", email: "", phone: "", departmentId: "" })
  }

  const getDepartmentById = (id: number) => {
    return departments.find(dept => dept.id === id)
  }

  return (
    <div className="flex-1 space-y-6 pr-6 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Department Management</h1>
          <p className="text-gray-600">Manage departments, products, and team members</p>
        </div>
        <Dialog open={showAddDepartment} onOpenChange={setShowAddDepartment}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Create a new department with manager and location details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDepartment} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="deptName">Department Name *</Label>
                <Input
                  id="deptName"
                  value={departmentForm.name}
                  onChange={(e) => setDepartmentForm({...departmentForm, name: e.target.value})}
                  required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="deptLocation">Location</Label>
                <Input
                  id="deptLocation"
                  value={departmentForm.location}
                  onChange={(e) => setDepartmentForm({...departmentForm, location: e.target.value})}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="deptManager">Department Manager *</Label>
                <Input
                  id="deptManager"
                  value={departmentForm.manager}
                  onChange={(e) => setDepartmentForm({...departmentForm, manager: e.target.value})}
                  required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="deptPhone">Phone</Label>
                <Input
                  id="deptPhone"
                  value={departmentForm.phone}
                  onChange={(e) => setDepartmentForm({...departmentForm, phone: e.target.value})}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="deptEmail">Email</Label>
                <Input
                  id="deptEmail"
                  type="email"
                  value={departmentForm.email}
                  onChange={(e) => setDepartmentForm({...departmentForm, email: e.target.value})}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="deptDescription">Description</Label>
                <Textarea
                  id="deptDescription"
                  value={departmentForm.description}
                  onChange={(e) => setDepartmentForm({...departmentForm, description: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full">Add Department</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{department.name}</CardTitle>
                <Badge variant="secondary">{department.products.length} Products</Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{department.location}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Manager: {department.manager}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{department.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{department.email}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{department.description}</p>
              
              <div className="flex space-x-2">
                <Dialog open={showAddProduct && selectedDepartment === department.id} onOpenChange={(open) => {
                  setShowAddProduct(open)
                  if (!open) setSelectedDepartment(null)
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDepartment(department.id)}
                    >
                      <PackagePlus className="h-4 w-4 mr-1" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Product to {department.name}</DialogTitle>
                      <DialogDescription>
                        Add a new product to this department.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="prodName">Product Name *</Label>
                        <Input
                          id="prodName"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prodCategory">Category *</Label>
                        <Select value={productForm.category} onValueChange={(value) => setProductForm({...productForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Raw Coffee">Raw Coffee</SelectItem>
                            <SelectItem value="Processed Coffee">Processed Coffee</SelectItem>
                            <SelectItem value="Export Ready">Export Ready</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Gift Items">Gift Items</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prodQuantity">Quantity</Label>
                        <Input
                          id="prodQuantity"
                          value={productForm.quantity}
                          onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prodPrice">Price</Label>
                        <Input
                          id="prodPrice"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prodSupplier">Supplier</Label>
                        <Input
                          id="prodSupplier"
                          value={productForm.supplier}
                          onChange={(e) => setProductForm({...productForm, supplier: e.target.value})}
                        />
                      </div>
                      <input type="hidden" value={department.id} />
                      <Button type="submit" className="w-full">Add Product</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={showAddTeam && selectedDepartment === department.id} onOpenChange={(open) => {
                  setShowAddTeam(open)
                  if (!open) setSelectedDepartment(null)
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDepartment(department.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member to {department.name}</DialogTitle>
                      <DialogDescription>
                        Add a new team member to this department.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddTeam} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="teamName">Name *</Label>
                        <Input
                          id="teamName"
                          value={teamForm.name}
                          onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamPosition">Position *</Label>
                        <Input
                          id="teamPosition"
                          value={teamForm.position}
                          onChange={(e) => setTeamForm({...teamForm, position: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamEmail">Email</Label>
                        <Input
                          id="teamEmail"
                          type="email"
                          value={teamForm.email}
                          onChange={(e) => setTeamForm({...teamForm, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamPhone">Phone</Label>
                        <Input
                          id="teamPhone"
                          value={teamForm.phone}
                          onChange={(e) => setTeamForm({...teamForm, phone: e.target.value})}
                        />
              </div>
                      <input type="hidden" value={department.id} />
                      <Button type="submit" className="w-full">Add Team Member</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

              {/* Products List */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  Products ({department.products.length})
                </h4>
                <div className="space-y-1">
                  {department.products.slice(0, 2).map((product) => (
                    <div key={product.id} className="text-sm text-gray-600 flex justify-between">
                      <span>{product.name}</span>
                      <span>{product.quantity}</span>
                    </div>
                  ))}
                  {department.products.length > 2 && (
                    <div className="text-xs text-blue-600">+{department.products.length - 2} more products</div>
                  )}
                </div>
              </div>

              {/* Team List */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Team ({department.team.length})
                </h4>
                <div className="space-y-1">
                  {department.team.slice(0, 2).map((member) => (
                    <div key={member.id} className="text-sm text-gray-600 flex justify-between">
                      <span>{member.name}</span>
                      <span className="text-xs">{member.position}</span>
                    </div>
                  ))}
                  {department.team.length > 2 && (
                    <div className="text-xs text-blue-600">+{department.team.length - 2} more members</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold">{departments.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{departments.reduce((sum, dept) => sum + dept.products.length, 0)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Team Members</p>
                <p className="text-2xl font-bold">{departments.reduce((sum, dept) => sum + dept.team.length, 0)}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Managers</p>
                <p className="text-2xl font-bold">{departments.length}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 