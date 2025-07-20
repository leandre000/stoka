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
import { Plus, Coffee, DollarSign, Users, Package, TrendingUp, Calculator } from "lucide-react"
import { toast } from "sonner"

export default function CoffeeProcessingPage() {
  const [showAddPurchase, setShowAddPurchase] = useState(false)
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showAddProcessing, setShowAddProcessing] = useState(false)
  const [showAddSale, setShowAddSale] = useState(false)

  const [purchaseForm, setPurchaseForm] = useState({
    type: "",
    quantity: "",
    amount: "",
    bonus: "",
    transportCost: "",
    date: ""
  })

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    position: "",
    dailyWage: "",
    hoursWorked: "",
    taxes: "",
    socialSecurity: ""
  })

  const [processingForm, setProcessingForm] = useState({
    inputType: "",
    inputQuantity: "",
    outputType: "",
    outputQuantity: "",
    pocketsUsed: "",
    transportCost: "",
    date: ""
  })

  const [saleForm, setSaleForm] = useState({
    type: "",
    grade: "",
    quantity: "",
    amount: "",
    date: ""
  })

  // Supreme Cherry Purchases
  const [supremeCherryPurchases] = useState([
    { id: 1, quantity: "1000kg", amount: 5000, bonus: 250, transportCost: 300, date: "2024-01-15" },
    { id: 2, quantity: "800kg", amount: 4000, bonus: 200, transportCost: 250, date: "2024-01-14" }
  ])

  // Parchment Coffee Purchases
  const [parchmentPurchases] = useState([
    { id: 1, quantity: "600kg", amount: 3600, transportCost: 200, date: "2024-01-15" },
    { id: 2, quantity: "400kg", amount: 2400, transportCost: 150, date: "2024-01-14" }
  ])

  // Processing Employees
  const [processingEmployees] = useState([
    { id: 1, name: "Alice Brown", position: "Processor", dailyWage: 30, hoursWorked: 8, taxes: 3.0, socialSecurity: 1.8, total: 25.2 },
    { id: 2, name: "Bob Wilson", position: "Quality Control", dailyWage: 35, hoursWorked: 8, taxes: 3.5, socialSecurity: 2.1, total: 29.4 }
  ])

  // Processing Records
  const [processingRecords] = useState([
    { id: 1, inputType: "Supreme Cherry", inputQuantity: "1000kg", outputType: "Fully Washed", outputQuantity: "800kg", pocketsUsed: 40, transportCost: 400, date: "2024-01-15" },
    { id: 2, inputType: "Parchment", inputQuantity: "600kg", outputType: "Fully Washed", outputQuantity: "480kg", pocketsUsed: 24, transportCost: 300, date: "2024-01-14" }
  ])

  // Sales Records
  const [salesRecords] = useState([
    { id: 1, type: "Supreme Cherry", grade: "A", quantity: "500kg", amount: 3500, date: "2024-01-15" },
    { id: 2, type: "Parchment", grade: "B", quantity: "300kg", amount: 2100, date: "2024-01-14" },
    { id: 3, type: "Fully Washed", grade: "A", quantity: "400kg", amount: 3200, date: "2024-01-13" }
  ])

  const handleAddPurchase = (e: React.FormEvent) => {
    e.preventDefault()
    if (!purchaseForm.type || !purchaseForm.quantity || !purchaseForm.amount) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Purchase record added successfully!")
    setShowAddPurchase(false)
    setPurchaseForm({ type: "", quantity: "", amount: "", bonus: "", transportCost: "", date: "" })
  }

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!employeeForm.name || !employeeForm.dailyWage) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Employee added successfully!")
    setShowAddEmployee(false)
    setEmployeeForm({ name: "", position: "", dailyWage: "", hoursWorked: "", taxes: "", socialSecurity: "" })
  }

  const handleAddProcessing = (e: React.FormEvent) => {
    e.preventDefault()
    if (!processingForm.inputType || !processingForm.outputType) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Processing record added successfully!")
    setShowAddProcessing(false)
    setProcessingForm({ inputType: "", inputQuantity: "", outputType: "", outputQuantity: "", pocketsUsed: "", transportCost: "", date: "" })
  }

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault()
    if (!saleForm.type || !saleForm.grade || !saleForm.amount) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Sale record added successfully!")
    setShowAddSale(false)
    setSaleForm({ type: "", grade: "", quantity: "", amount: "", date: "" })
  }

  // Calculate totals
  const totalSupremeCherryCost = supremeCherryPurchases.reduce((sum, item) => sum + item.amount + item.bonus + item.transportCost, 0)
  const totalParchmentCost = parchmentPurchases.reduce((sum, item) => sum + item.amount + item.transportCost, 0)
  const totalEmployeeCost = processingEmployees.reduce((sum, emp) => sum + emp.total, 0)
  const totalProcessingCost = processingRecords.reduce((sum, proc) => sum + proc.transportCost, 0)
  const totalSales = salesRecords.reduce((sum, sale) => sum + sale.amount, 0)
  const totalCost = totalSupremeCherryCost + totalParchmentCost + totalEmployeeCost + totalProcessingCost
  const netProfit = totalSales - totalCost

  return (
    <div className="flex-1 space-y-6 pr-6 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coffee Processing & Sales Management</h1>
          <p className="text-gray-600">Manage coffee purchases, processing, and sales operations</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">FRW {totalSales}</p>
                <p className="text-sm text-green-600">+15.2%</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Costs</p>
                <p className="text-2xl font-bold">FRW {totalCost}</p>
                <p className="text-sm text-red-600">+8.3%</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold">FRW {netProfit}</p>
                <p className="text-sm text-blue-600">Coffee operations</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Employees</p>
                <p className="text-2xl font-bold">{processingEmployees.length}</p>
                <p className="text-sm text-gray-500">Daily workers</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supreme Cherry Purchase Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supreme Cherry Purchase Management</CardTitle>
          <Dialog open={showAddPurchase} onOpenChange={setShowAddPurchase}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Purchase
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Supreme Cherry Purchase</DialogTitle>
                <DialogDescription>
                  Add daily coffee purchase details including bonus and transport costs.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPurchase} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseType">Coffee Type</Label>
                  <Input
                    id="purchaseType"
                    value="Supreme Cherry"
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg) *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={purchaseForm.quantity}
                    onChange={(e) => setPurchaseForm({...purchaseForm, quantity: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (FRW) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={purchaseForm.amount}
                    onChange={(e) => setPurchaseForm({...purchaseForm, amount: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bonus">Bonus to Farmer (FRW)</Label>
                  <Input
                    id="bonus"
                    type="number"
                    value={purchaseForm.bonus}
                    onChange={(e) => setPurchaseForm({...purchaseForm, bonus: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transportCost">Transport Cost (FRW)</Label>
                  <Input
                    id="transportCost"
                    type="number"
                    value={purchaseForm.transportCost}
                    onChange={(e) => setPurchaseForm({...purchaseForm, transportCost: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={purchaseForm.date}
                    onChange={(e) => setPurchaseForm({...purchaseForm, date: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Purchase</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Transport</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supremeCherryPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.quantity}</TableCell>
                  <TableCell>FRW {purchase.amount}</TableCell>
                  <TableCell>FRW {purchase.bonus}</TableCell>
                  <TableCell>FRW {purchase.transportCost}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Parchment Coffee Purchase Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Parchment Coffee Purchase Management</CardTitle>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Parchment Purchase
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transport</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parchmentPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.quantity}</TableCell>
                  <TableCell>FRW {purchase.amount}</TableCell>
                  <TableCell>FRW {purchase.transportCost}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Processing Employee Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Processing Employee Management</CardTitle>
          <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Processing Employee</DialogTitle>
                <DialogDescription>
                  Add employee details for coffee processing operations.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="empName">Employee Name *</Label>
                  <Input
                    id="empName"
                    value={employeeForm.name}
                    onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empPosition">Position</Label>
                  <Input
                    id="empPosition"
                    value={employeeForm.position}
                    onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empWage">Daily Wage (FRW) *</Label>
                  <Input
                    id="empWage"
                    type="number"
                    value={employeeForm.dailyWage}
                    onChange={(e) => setEmployeeForm({...employeeForm, dailyWage: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empHours">Hours Worked</Label>
                  <Input
                    id="empHours"
                    type="number"
                    value={employeeForm.hoursWorked}
                    onChange={(e) => setEmployeeForm({...employeeForm, hoursWorked: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empTaxes">Taxes (%)</Label>
                  <Input
                    id="empTaxes"
                    type="number"
                    value={employeeForm.taxes}
                    onChange={(e) => setEmployeeForm({...employeeForm, taxes: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empSocial">Social Security (%)</Label>
                  <Input
                    id="empSocial"
                    type="number"
                    value={employeeForm.socialSecurity}
                    onChange={(e) => setEmployeeForm({...employeeForm, socialSecurity: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Employee</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Daily Wage</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Taxes</TableHead>
                <TableHead>Social Security</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processingEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>FRW {employee.dailyWage}</TableCell>
                  <TableCell>{employee.hoursWorked}h</TableCell>
                  <TableCell>{employee.taxes}%</TableCell>
                  <TableCell>{employee.socialSecurity}%</TableCell>
                  <TableCell>FRW {employee.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Coffee Processing Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fully Washed Coffee Processing</CardTitle>
          <Dialog open={showAddProcessing} onOpenChange={setShowAddProcessing}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Processing
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Processing Record</DialogTitle>
                <DialogDescription>
                  Add coffee processing details from input to fully washed output.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProcessing} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inputType">Input Type *</Label>
                  <Select value={processingForm.inputType} onValueChange={(value) => setProcessingForm({...processingForm, inputType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select input type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supreme-cherry">Supreme Cherry</SelectItem>
                      <SelectItem value="parchment">Parchment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inputQuantity">Input Quantity (kg) *</Label>
                  <Input
                    id="inputQuantity"
                    type="number"
                    value={processingForm.inputQuantity}
                    onChange={(e) => setProcessingForm({...processingForm, inputQuantity: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outputType">Output Type</Label>
                  <Input
                    id="outputType"
                    value="Fully Washed"
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outputQuantity">Output Quantity (kg)</Label>
                  <Input
                    id="outputQuantity"
                    type="number"
                    value={processingForm.outputQuantity}
                    onChange={(e) => setProcessingForm({...processingForm, outputQuantity: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pocketsUsed">Pockets Used</Label>
                  <Input
                    id="pocketsUsed"
                    type="number"
                    value={processingForm.pocketsUsed}
                    onChange={(e) => setProcessingForm({...processingForm, pocketsUsed: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="procTransportCost">Transport Cost (FRW)</Label>
                  <Input
                    id="procTransportCost"
                    type="number"
                    value={processingForm.transportCost}
                    onChange={(e) => setProcessingForm({...processingForm, transportCost: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="procDate">Date</Label>
                  <Input
                    id="procDate"
                    type="date"
                    value={processingForm.date}
                    onChange={(e) => setProcessingForm({...processingForm, date: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Processing</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Input Type</TableHead>
                <TableHead>Input Quantity</TableHead>
                <TableHead>Output Quantity</TableHead>
                <TableHead>Pockets Used</TableHead>
                <TableHead>Transport Cost</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processingRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="capitalize">{record.inputType.replace('-', ' ')}</TableCell>
                  <TableCell>{record.inputQuantity}</TableCell>
                  <TableCell>{record.outputQuantity}</TableCell>
                  <TableCell>{record.pocketsUsed}</TableCell>
                  <TableCell>FRW {record.transportCost}</TableCell>
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Coffee Sales Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Coffee Sales by Grade</CardTitle>
          <Dialog open={showAddSale} onOpenChange={setShowAddSale}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Sale
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Sale Record</DialogTitle>
                <DialogDescription>
                  Add coffee sales by type and grade.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSale} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="saleType">Coffee Type *</Label>
                  <Select value={saleForm.type} onValueChange={(value) => setSaleForm({...saleForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coffee type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supreme-cherry">Supreme Cherry</SelectItem>
                      <SelectItem value="parchment">Parchment</SelectItem>
                      <SelectItem value="fully-washed">Fully Washed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleGrade">Grade *</Label>
                  <Select value={saleForm.grade} onValueChange={(value) => setSaleForm({...saleForm, grade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Grade A</SelectItem>
                      <SelectItem value="B">Grade B</SelectItem>
                      <SelectItem value="C">Grade C</SelectItem>
                      <SelectItem value="D">Grade D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleQuantity">Quantity (kg)</Label>
                  <Input
                    id="saleQuantity"
                    type="number"
                    value={saleForm.quantity}
                    onChange={(e) => setSaleForm({...saleForm, quantity: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleAmount">Amount (FRW) *</Label>
                  <Input
                    id="saleAmount"
                    type="number"
                    value={saleForm.amount}
                    onChange={(e) => setSaleForm({...saleForm, amount: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleDate">Date</Label>
                  <Input
                    id="saleDate"
                    type="date"
                    value={saleForm.date}
                    onChange={(e) => setSaleForm({...saleForm, date: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Sale</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesRecords.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="capitalize">{sale.type.replace('-', ' ')}</TableCell>
                  <TableCell>Grade {sale.grade}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>FRW {sale.amount}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Coffee Processing & Sales Financial Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-blue-100">Supreme Cherry Costs</p>
              <p className="text-lg font-bold">FRW {totalSupremeCherryCost}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Parchment Costs</p>
              <p className="text-lg font-bold">FRW {totalParchmentCost}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Employee Costs</p>
              <p className="text-lg font-bold">FRW {totalEmployeeCost}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Processing Costs</p>
              <p className="text-lg font-bold">FRW {totalProcessingCost}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-100">Total Costs</p>
                <p className="text-lg font-bold">FRW {totalCost}</p>
              </div>
              <div>
                <p className="text-sm text-blue-100">Total Sales</p>
                <p className="text-lg font-bold">FRW {totalSales}</p>
              </div>
              <div>
                <p className="text-sm text-blue-100">Net Profit</p>
                <p className="text-lg font-bold">FRW {netProfit}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 