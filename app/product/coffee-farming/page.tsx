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
import { Plus, Users, DollarSign, MapPin, Coffee, Calculator } from "lucide-react"
import { toast } from "sonner"

export default function CoffeeFarmingPage() {
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddLand, setShowAddLand] = useState(false)
  const [showAddCoffee, setShowAddCoffee] = useState(false)

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    position: "",
    dailyWage: "",
    hoursWorked: "",
    taxes: "",
    socialSecurity: ""
  })

  const [expenseForm, setExpenseForm] = useState({
    type: "",
    amount: "",
    description: "",
    date: ""
  })

  const [landForm, setLandForm] = useState({
    size: "",
    value: "",
    location: "",
    purchaseDate: ""
  })

  const [coffeeForm, setCoffeeForm] = useState({
    type: "",
    quantity: "",
    cost: "",
    date: ""
  })

  const [employees] = useState([
    { id: 1, name: "John Doe", position: "Harvester", dailyWage: 25, hoursWorked: 8, taxes: 2.5, socialSecurity: 1.5, total: 21 },
    { id: 2, name: "Jane Smith", position: "Sorter", dailyWage: 22, hoursWorked: 8, taxes: 2.2, socialSecurity: 1.3, total: 18.5 },
    { id: 3, name: "Mike Johnson", position: "Supervisor", dailyWage: 35, hoursWorked: 8, taxes: 3.5, socialSecurity: 2.1, total: 29.4 }
  ])

  const [expenses] = useState([
    { id: 1, type: "Transportation", amount: 150, description: "Fuel for vehicles", date: "2024-01-15" },
    { id: 2, type: "Packaging", amount: 75, description: "Coffee bags and containers", date: "2024-01-14" },
    { id: 3, type: "Attraction", amount: 50, description: "Marketing materials", date: "2024-01-13" }
  ])

  const [lands] = useState([
    { id: 1, size: "5 hectares", value: 25000, location: "Northern Region", purchaseDate: "2023-06-15" },
    { id: 2, size: "3 hectares", value: 15000, location: "Eastern Region", purchaseDate: "2023-08-20" }
  ])

  const [coffeeMovies] = useState([
    { id: 1, type: "Supreme Cherry", quantity: "500kg", cost: 2500, date: "2024-01-15" },
    { id: 2, type: "Parchment", quantity: "300kg", cost: 1800, date: "2024-01-14" }
  ])

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

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!expenseForm.type || !expenseForm.amount) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Expense added successfully!")
    setShowAddExpense(false)
    setExpenseForm({ type: "", amount: "", description: "", date: "" })
  }

  const handleAddLand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!landForm.size || !landForm.value) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Land record added successfully!")
    setShowAddLand(false)
    setLandForm({ size: "", value: "", location: "", purchaseDate: "" })
  }

  const handleAddCoffee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!coffeeForm.type || !coffeeForm.quantity) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Coffee record added successfully!")
    setShowAddCoffee(false)
    setCoffeeForm({ type: "", quantity: "", cost: "", date: "" })
  }

  const totalEmployeeCost = employees.reduce((sum, emp) => sum + emp.total, 0)
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalLandValue = lands.reduce((sum, land) => sum + land.value, 0)
  const totalCoffeeCost = coffeeMovies.reduce((sum, coffee) => sum + coffee.cost, 0)
  const totalCost = totalEmployeeCost + totalExpenses + totalLandValue + totalCoffeeCost

  return (
    <div className="flex-1 space-y-6 pr-6 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coffee Farming Management</h1>
          <p className="text-gray-600">Manage employees, expenses, land, and coffee production</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
                <p className="text-sm text-gray-500">Daily workers</p>
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
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold">${totalExpenses}</p>
                <p className="text-sm text-gray-500">Transport, pack, attract</p>
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
                <p className="text-sm font-medium text-gray-600">Land Value</p>
                <p className="text-2xl font-bold">${totalLandValue}</p>
                <p className="text-sm text-gray-500">Average land value</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold">${totalCost}</p>
                <p className="text-sm text-gray-500">All expenses combined</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employee Management (Nyakazi)</CardTitle>
          <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Add employee details including wages, taxes, and social security.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Employee Name *</Label>
                  <Input
                    id="name"
                    value={employeeForm.name}
                    onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={employeeForm.position}
                    onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyWage">Daily Wage (FRW) *</Label>
                  <Input
                    id="dailyWage"
                    type="number"
                    value={employeeForm.dailyWage}
                    onChange={(e) => setEmployeeForm({...employeeForm, dailyWage: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hoursWorked">Hours Worked</Label>
                  <Input
                    id="hoursWorked"
                    type="number"
                    value={employeeForm.hoursWorked}
                    onChange={(e) => setEmployeeForm({...employeeForm, hoursWorked: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxes">Taxes (%)</Label>
                  <Input
                    id="taxes"
                    type="number"
                    value={employeeForm.taxes}
                    onChange={(e) => setEmployeeForm({...employeeForm, taxes: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialSecurity">Social Security (%)</Label>
                  <Input
                    id="socialSecurity"
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
              {employees.map((employee) => (
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

      {/* Supplementary Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplementary Management (Transportation, Pack, Attract)</CardTitle>
          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Add transportation, packaging, or attraction expenses.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expenseType">Expense Type *</Label>
                  <Select value={expenseForm.type} onValueChange={(value) => setExpenseForm({...expenseForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="packaging">Packaging</SelectItem>
                      <SelectItem value="attraction">Attraction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (FRW) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Expense</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="capitalize">{expense.type}</TableCell>
                  <TableCell>FRW {expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Land Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Land Size & Value Management</CardTitle>
          <Dialog open={showAddLand} onOpenChange={setShowAddLand}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Land
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Land Record</DialogTitle>
                <DialogDescription>
                  Add land size and average land value.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddLand} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Land Size *</Label>
                  <Input
                    id="size"
                    placeholder="e.g., 5 hectares"
                    value={landForm.size}
                    onChange={(e) => setLandForm({...landForm, size: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Land Value (FRW) *</Label>
                  <Input
                    id="value"
                    type="number"
                    value={landForm.value}
                    onChange={(e) => setLandForm({...landForm, value: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={landForm.location}
                    onChange={(e) => setLandForm({...landForm, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={landForm.purchaseDate}
                    onChange={(e) => setLandForm({...landForm, purchaseDate: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Land</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lands.map((land) => (
                <TableRow key={land.id}>
                  <TableCell>{land.size}</TableCell>
                  <TableCell>FRW {land.value}</TableCell>
                  <TableCell>{land.location}</TableCell>
                  <TableCell>{land.purchaseDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Coffee Movies Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Coffee Movies (Affected Coffee Cost)</CardTitle>
          <Dialog open={showAddCoffee} onOpenChange={setShowAddCoffee}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Coffee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Coffee Record</DialogTitle>
                <DialogDescription>
                  Add coffee type, quantity, and cost.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCoffee} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coffeeType">Coffee Type *</Label>
                  <Select value={coffeeForm.type} onValueChange={(value) => setCoffeeForm({...coffeeForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supreme-cherry">Supreme Cherry</SelectItem>
                      <SelectItem value="parchment">Parchment</SelectItem>
                      <SelectItem value="fully-washed">Fully Washed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 500kg"
                    value={coffeeForm.quantity}
                    onChange={(e) => setCoffeeForm({...coffeeForm, quantity: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost (FRW) *</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={coffeeForm.cost}
                    onChange={(e) => setCoffeeForm({...coffeeForm, cost: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coffeeDate">Date</Label>
                  <Input
                    id="coffeeDate"
                    type="date"
                    value={coffeeForm.date}
                    onChange={(e) => setCoffeeForm({...coffeeForm, date: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Coffee</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coffeeMovies.map((coffee) => (
                <TableRow key={coffee.id}>
                  <TableCell className="capitalize">{coffee.type.replace('-', ' ')}</TableCell>
                  <TableCell>{coffee.quantity}</TableCell>
                  <TableCell>FRW {coffee.cost}</TableCell>
                  <TableCell>{coffee.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Total Coffee Farming Expenses Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-blue-100">Employee Costs</p>
              <p className="text-lg font-bold">FRW {totalEmployeeCost}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Supplementary Expenses</p>
              <p className="text-lg font-bold">FRW {totalExpenses}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Land Value</p>
              <p className="text-lg font-bold">FRW {totalLandValue}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Coffee Costs</p>
              <p className="text-lg font-bold">FRW {totalCoffeeCost}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500">
            <p className="text-lg font-bold">Total: FRW {totalCost}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 