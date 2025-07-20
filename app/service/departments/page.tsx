"use client"

import React, { useState } from "react"
import { Search, Plus, Filter, Users, Building2, DollarSign, Settings, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ServiceDepartments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departments, setDepartments] = useState([
    {
      id: "SERV001",
      name: "Service Delivery",
      manager: "Alex Carter",
      employees: 10,
      budget: 120000,
      spent: 70000,
      projects: 32,
      revenue: 210000,
      status: "Active",
      location: "Floor 1, Section S",
    },
    {
      id: "SERV002",
      name: "Support",
      manager: "Emma Lee",
      employees: 7,
      budget: 90000,
      spent: 48000,
      projects: 18,
      revenue: 120000,
      status: "Active",
      location: "Floor 2, Section T",
    },
    {
      id: "SERV003",
      name: "Training",
      manager: "David Kim",
      employees: 5,
      budget: 60000,
      spent: 35000,
      projects: 12,
      revenue: 80000,
      status: "Active",
      location: "Floor 1, Section U",
    },
    {
      id: "SERV004",
      name: "Consulting",
      manager: "Sophia Brown",
      employees: 4,
      budget: 50000,
      spent: 20000,
      projects: 8,
      revenue: 60000,
      status: "Inactive",
      location: "Floor 3, Section V",
    },
  ])
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({
    name: "",
    manager: "",
    employees: "",
    budget: "",
    spent: "",
    projects: "",
    revenue: "",
    status: "Active",
    location: ""
  })

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    )
  }

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0)
  const totalRevenue = departments.reduce((sum, dept) => sum + dept.revenue, 0)

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.manager || !form.employees || !form.budget || !form.spent || !form.projects || !form.revenue || !form.location) {
      toast.error("Please fill in all fields")
      return
    }
    setDepartments([
      ...departments,
      {
        id: `SERV${departments.length + 1}`,
        name: form.name,
        manager: form.manager,
        employees: Number(form.employees),
        budget: Number(form.budget),
        spent: Number(form.spent),
        projects: Number(form.projects),
        revenue: Number(form.revenue),
        status: form.status,
        location: form.location
      }
    ])
    setForm({ name: "", manager: "", employees: "", budget: "", spent: "", projects: "", revenue: "", status: "Active", location: "" })
    setShowAdd(false)
    toast.success("Department added successfully!")
  }

  const handleEdit = () => toast.info("Edit Department (placeholder)")
  const handleDelete = () => toast.success("Department deleted (placeholder)")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service Departments Management</h1>
          <p className="text-gray-600">Organize and manage your service departments</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Department</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Manager</Label>
                  <Input value={form.manager} onChange={e => setForm(f => ({ ...f, manager: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Employees</Label>
                  <Input type="number" value={form.employees} onChange={e => setForm(f => ({ ...f, employees: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Input type="number" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Spent</Label>
                  <Input type="number" value={form.spent} onChange={e => setForm(f => ({ ...f, spent: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Projects</Label>
                  <Input type="number" value={form.projects} onChange={e => setForm(f => ({ ...f, projects: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Revenue</Label>
                  <Input type="number" value={form.revenue} onChange={e => setForm(f => ({ ...f, revenue: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select className="w-full rounded border px-2 py-2" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Location</Label>
                  <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
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
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.id}</TableCell>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>{dept.manager}</TableCell>
                  <TableCell>{dept.employees}</TableCell>
                  <TableCell>${dept.budget.toLocaleString()}</TableCell>
                  <TableCell>${dept.spent.toLocaleString()}</TableCell>
                  <TableCell>{dept.projects}</TableCell>
                  <TableCell>${dept.revenue.toLocaleString()}</TableCell>
                  <TableCell>{dept.location}</TableCell>
                  <TableCell>{getStatusBadge(dept.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleEdit}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleEdit}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Department
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleEdit}>
                          <Users className="h-4 w-4 mr-2" />
                          Manage Staff
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 