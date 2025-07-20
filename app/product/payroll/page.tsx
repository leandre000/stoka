"use client"

import React, { useState } from "react"
import { Search, Plus, Filter, Download, Eye, Edit, Calculator, DollarSign, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function Payroll() {
  const [searchTerm, setSearchTerm] = useState("")
  const [payroll, setPayroll] = useState([
    {
      id: "EMP001",
      name: "John Smith",
      position: "Store Manager",
      department: "Management",
      baseSalary: 5500,
      tax: 5500,
      bonus: 500,
      deductions: 200,
      netPay: 5800,
      status: "Processed",
      payDate: "2024-01-31",
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      position: "Inventory Specialist",
      department: "Operations",
      baseSalary: 4200,
      tax: 4200,
      bonus: 200,
      deductions: 150,
      netPay: 4250,
      status: "Pending",
      payDate: "2024-01-31",
    },
    {
      id: "EMP003",
      name: "Mike Wilson",
      position: "Sales Associate",
      department: "Sales",
      baseSalary: 3200,
      tax: 4,
      bonus: 150,
      deductions: 120,
      netPay: 3230,
      status: "Processed",
      payDate: "2024-01-31",
    },
    {
      id: "EMP004",
      name: "Emma Davis",
      position: "Accountant",
      department: "Finance",
      baseSalary: 4800,
      tax: 0,
      bonus: 300,
      deductions: 180,
      netPay: 4920,
      status: "Pending",
      payDate: "2024-01-31",
    },
  ])
  const [showAdd, setShowAdd] = useState(false)
  const [showProcess, setShowProcess] = useState(false)
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    baseSalary: "",
    tax: "",
    bonus: "",
    deductions: "",
    netPay: "",
    status: "Pending",
    payDate: "2024-01-31"
  })

  const getStatusBadge = (status: string) => {
    return status === "Processed" ? (
      <Badge className="bg-green-100 text-green-800">Processed</Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    )
  }

  const filteredEmployees = payroll.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPayroll = payroll.reduce((sum, emp) => sum + emp.netPay, 0)
  const processedCount = payroll.filter((emp) => emp.status === "Processed").length
  const pendingCount = payroll.filter((emp) => emp.status === "Pending").length

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.position || !form.department || !form.baseSalary || !form.tax || !form.bonus || !form.deductions || !form.payDate) {
      toast.error("Please fill in all fields")
      return
    }
    const netPay = Number(form.baseSalary) + Number(form.bonus) - Number(form.deductions)
    setPayroll([
      ...payroll,
      {
        id: `EMP${payroll.length + 1}`,
        name: form.name,
        position: form.position,
        department: form.department,
        baseSalary: Number(form.baseSalary),
        tax: Number(form.tax),
        bonus: Number(form.bonus),
        deductions: Number(form.deductions),
        netPay,
        status: form.status,
        payDate: form.payDate
      }
    ])
    setForm({ name: "", position: "", department: "", baseSalary: "", tax: "", bonus: "", deductions: "", netPay: "", status: "Pending", payDate: "2024-01-31" })
    setShowAdd(false)
    toast.success("Employee added to payroll!")
  }

  const handleProcessPayroll = (e: React.FormEvent) => {
    e.preventDefault()
    setShowProcess(false)
    toast.success("Payroll processed! (placeholder)")
  }

  const handleEdit = () => toast.info("Edit Employee (placeholder)")
  const handleDownload = () => toast.success("Payslip downloaded (placeholder)")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-gray-600">Manage employee salaries and payroll processing</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showProcess} onOpenChange={setShowProcess}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calculator className="h-4 w-4 mr-2" />
                Process Payroll
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Process Payroll</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleProcessPayroll} className="space-y-4">
                <p className="text-gray-600">This will process payroll for all pending employees. Are you sure?</p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowProcess(false)}>Cancel</Button>
                  <Button type="submit">Process</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Base Salary</Label>
                    <Input type="number" value={form.baseSalary} onChange={e => setForm(f => ({ ...f, baseSalary: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax</Label>
                    <Input type="number" value={form.tax} onChange={e => setForm(f => ({ ...f, tax: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Bonus</Label>
                    <Input type="number" value={form.bonus} onChange={e => setForm(f => ({ ...f, bonus: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Deductions</Label>
                    <Input type="number" value={form.deductions} onChange={e => setForm(f => ({ ...f, deductions: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Pay Date</Label>
                    <Input type="date" value={form.payDate} onChange={e => setForm(f => ({ ...f, payDate: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <select className="w-full rounded border px-2 py-2" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                      <option value="Processed">Processed</option>
                      <option value="Pending">Pending</option>
                    </select>
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold">${totalPayroll.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{payroll.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processed</p>
                <p className="text-2xl font-bold text-green-600">{processedCount}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
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
                  placeholder="Search employees..."
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
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Export Payroll
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Payroll - January 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>${employee.baseSalary}</TableCell>
                  <TableCell>{employee.tax}h</TableCell>
                  <TableCell>${employee.bonus}</TableCell>
                  <TableCell>${employee.deductions}</TableCell>
                  <TableCell className="font-bold">${employee.netPay}</TableCell>
                  <TableCell>{getStatusBadge(employee.status)}</TableCell>
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
                          View Payslip
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleEdit}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Payslip
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