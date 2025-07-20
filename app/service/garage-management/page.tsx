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
import { Plus, Car, Wrench, Users, DollarSign, Calendar, Phone, Mail, UserPlus, PackagePlus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function GarageManagementPage() {
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [showAddService, setShowAddService] = useState(false)
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [showAddAppointment, setShowAddAppointment] = useState(false)

  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicleInfo: ""
  })

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: ""
  })

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    salary: "",
    skills: ""
  })

  const [vehicleForm, setVehicleForm] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    customerId: "",
    vin: ""
  })

  const [appointmentForm, setAppointmentForm] = useState({
    customerId: "",
    vehicleId: "",
    serviceId: "",
    date: "",
    time: "",
    notes: ""
  })

  // Sample data
  const [customers] = useState([
    { id: 1, name: "John Smith", phone: "+250 788 123 456", email: "john@email.com", address: "Kigali, Rwanda", vehicleInfo: "Toyota Camry 2020" },
    { id: 2, name: "Sarah Johnson", phone: "+250 788 234 567", email: "sarah@email.com", address: "Kigali, Rwanda", vehicleInfo: "Honda Civic 2019" },
    { id: 3, name: "Mike Wilson", phone: "+250 788 345 678", email: "mike@email.com", address: "Kigali, Rwanda", vehicleInfo: "Ford Focus 2021" }
  ])

  const [services] = useState([
    { id: 1, name: "Oil Change", description: "Complete oil change service", price: 25000, duration: "30 min", category: "Maintenance" },
    { id: 2, name: "Brake Service", description: "Brake pad replacement and inspection", price: 45000, duration: "2 hours", category: "Repair" },
    { id: 3, name: "Tire Rotation", description: "Tire rotation and balancing", price: 15000, duration: "45 min", category: "Maintenance" },
    { id: 4, name: "Engine Diagnostic", description: "Computer diagnostic and troubleshooting", price: 35000, duration: "1 hour", category: "Diagnostic" }
  ])

  const [employees] = useState([
    { id: 1, name: "David Mechanic", position: "Senior Mechanic", phone: "+250 788 456 789", email: "david@garage.com", salary: 150000, skills: "Engine repair, diagnostics" },
    { id: 2, name: "Lisa Technician", position: "Service Technician", phone: "+250 788 567 890", email: "lisa@garage.com", salary: 120000, skills: "Oil changes, tire service" },
    { id: 3, name: "Tom Advisor", position: "Service Advisor", phone: "+250 788 678 901", email: "tom@garage.com", salary: 100000, skills: "Customer service, scheduling" }
  ])

  const [vehicles] = useState([
    { id: 1, make: "Toyota", model: "Camry", year: "2020", licensePlate: "RAB 123A", customerId: 1, vin: "1HGBH41JXMN109186" },
    { id: 2, make: "Honda", model: "Civic", year: "2019", licensePlate: "RAB 456B", customerId: 2, vin: "2T1BURHE0JC123456" },
    { id: 3, make: "Ford", model: "Focus", year: "2021", licensePlate: "RAB 789C", customerId: 3, vin: "3VWDX7AJ5DM123456" }
  ])

  const [appointments] = useState([
    { id: 1, customerId: 1, vehicleId: 1, serviceId: 1, date: "2024-01-20", time: "09:00", status: "Scheduled", notes: "Regular maintenance" },
    { id: 2, customerId: 2, vehicleId: 2, serviceId: 2, date: "2024-01-20", time: "11:00", status: "In Progress", notes: "Brake noise complaint" },
    { id: 3, customerId: 3, vehicleId: 3, serviceId: 3, date: "2024-01-21", time: "14:00", status: "Completed", notes: "Tire rotation needed" }
  ])

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerForm.name || !customerForm.phone) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Customer added successfully!")
    setShowAddCustomer(false)
    setCustomerForm({ name: "", phone: "", email: "", address: "", vehicleInfo: "" })
  }

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceForm.name || !serviceForm.price) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Service added successfully!")
    setShowAddService(false)
    setServiceForm({ name: "", description: "", price: "", duration: "", category: "" })
  }

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!employeeForm.name || !employeeForm.position) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Employee added successfully!")
    setShowAddEmployee(false)
    setEmployeeForm({ name: "", position: "", phone: "", email: "", salary: "", skills: "" })
  }

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    if (!vehicleForm.make || !vehicleForm.model || !vehicleForm.licensePlate) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Vehicle added successfully!")
    setShowAddVehicle(false)
    setVehicleForm({ make: "", model: "", year: "", licensePlate: "", customerId: "", vin: "" })
  }

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!appointmentForm.customerId || !appointmentForm.serviceId || !appointmentForm.date) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success("Appointment scheduled successfully!")
    setShowAddAppointment(false)
    setAppointmentForm({ customerId: "", vehicleId: "", serviceId: "", date: "", time: "", notes: "" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>
      case "In Progress":
        return <Badge className="bg-yellow-100 text-yellow-800"><Wrench className="h-3 w-3 mr-1" />In Progress</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800"><AlertCircle className="h-3 w-3 mr-1" />Unknown</Badge>
    }
  }

  const getCustomerById = (id: number) => customers.find(c => c.id === id)
  const getVehicleById = (id: number) => vehicles.find(v => v.id === id)
  const getServiceById = (id: number) => services.find(s => s.id === id)

  const totalRevenue = appointments.filter(a => a.status === "Completed").reduce((sum, app) => {
    const service = getServiceById(app.serviceId as any)
    return sum + (service?.price || 0)
  }, 0)

  const pendingAppointments = appointments.filter(a => a.status === "Scheduled").length
  const inProgressAppointments = appointments.filter(a => a.status === "In Progress").length

  return (
    <div className="flex-1 space-y-6 pr-6 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Garage Management System</h1>
          <p className="text-gray-600">Manage customers, services, employees, and appointments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-sm text-green-600">+12% this month</p>
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
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">FRW {totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+8.3% this month</p>
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
                <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
                <p className="text-2xl font-bold">{pendingAppointments}</p>
                <p className="text-sm text-blue-600">Scheduled today</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{inProgressAppointments}</p>
                <p className="text-sm text-yellow-600">Currently working</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Wrench className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer Management</CardTitle>
          <Dialog open={showAddCustomer} onOpenChange={setShowAddCustomer}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Add customer details and vehicle information.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone *</Label>
                  <Input
                    id="customerPhone"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerAddress">Address</Label>
                  <Textarea
                    id="customerAddress"
                    value={customerForm.address}
                    onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleInfo">Vehicle Information</Label>
                  <Input
                    id="vehicleInfo"
                    value={customerForm.vehicleInfo}
                    onChange={(e) => setCustomerForm({...customerForm, vehicleInfo: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Add Customer</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Vehicle Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.vehicleInfo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Service Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Service Management</CardTitle>
          <Dialog open={showAddService} onOpenChange={setShowAddService}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Add service details including price and duration.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name *</Label>
                  <Input
                    id="serviceName"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Description</Label>
                  <Textarea
                    id="serviceDescription"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servicePrice">Price (FRW) *</Label>
                  <Input
                    id="servicePrice"
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDuration">Duration</Label>
                  <Input
                    id="serviceDuration"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceCategory">Category</Label>
                  <Select value={serviceForm.category} onValueChange={(value) => setServiceForm({...serviceForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Repair">Repair</SelectItem>
                      <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Add Service</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>FRW {service.price.toLocaleString()}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>{service.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Employee Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employee Management</CardTitle>
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
                  Add employee details including position and skills.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Employee Name *</Label>
                  <Input
                    id="employeeName"
                    value={employeeForm.name}
                    onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeePosition">Position *</Label>
                  <Input
                    id="employeePosition"
                    value={employeeForm.position}
                    onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeePhone">Phone</Label>
                  <Input
                    id="employeePhone"
                    value={employeeForm.phone}
                    onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeEmail">Email</Label>
                  <Input
                    id="employeeEmail"
                    type="email"
                    value={employeeForm.email}
                    onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeSalary">Salary (FRW)</Label>
                  <Input
                    id="employeeSalary"
                    type="number"
                    value={employeeForm.salary}
                    onChange={(e) => setEmployeeForm({...employeeForm, salary: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeSkills">Skills</Label>
                  <Textarea
                    id="employeeSkills"
                    value={employeeForm.skills}
                    onChange={(e) => setEmployeeForm({...employeeForm, skills: e.target.value})}
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
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>FRW {employee.salary.toLocaleString()}</TableCell>
                  <TableCell>{employee.skills}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vehicle Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vehicle Management</CardTitle>
          <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Add vehicle details and link to customer.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVehicle} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleMake">Make *</Label>
                  <Input
                    id="vehicleMake"
                    value={vehicleForm.make}
                    onChange={(e) => setVehicleForm({...vehicleForm, make: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Model *</Label>
                  <Input
                    id="vehicleModel"
                    value={vehicleForm.model}
                    onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleYear">Year</Label>
                  <Input
                    id="vehicleYear"
                    value={vehicleForm.year}
                    onChange={(e) => setVehicleForm({...vehicleForm, year: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate *</Label>
                  <Input
                    id="licensePlate"
                    value={vehicleForm.licensePlate}
                    onChange={(e) => setVehicleForm({...vehicleForm, licensePlate: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleVin">VIN</Label>
                  <Input
                    id="vehicleVin"
                    value={vehicleForm.vin}
                    onChange={(e) => setVehicleForm({...vehicleForm, vin: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer</Label>
                  <Select value={vehicleForm.customerId} onValueChange={(value) => setVehicleForm({...vehicleForm, customerId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id.toString()}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Add Vehicle</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Customer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.licensePlate}</TableCell>
                  <TableCell>{vehicle.vin}</TableCell>
                  <TableCell>{getCustomerById(vehicle.customerId)?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Appointment Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Appointment Management</CardTitle>
          <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Schedule an appointment for a customer.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appointmentCustomer">Customer *</Label>
                  <Select value={appointmentForm.customerId} onValueChange={(value) => setAppointmentForm({...appointmentForm, customerId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id.toString()}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentVehicle">Vehicle</Label>
                  <Select value={appointmentForm.vehicleId} onValueChange={(value) => setAppointmentForm({...appointmentForm, vehicleId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                          {vehicle.make} {vehicle.model} - {vehicle.licensePlate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentService">Service *</Label>
                  <Select value={appointmentForm.serviceId} onValueChange={(value) => setAppointmentForm({...appointmentForm, serviceId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} - FRW {service.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Date *</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentTime">Time</Label>
                  <Input
                    id="appointmentTime"
                    type="time"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentNotes">Notes</Label>
                  <Textarea
                    id="appointmentNotes"
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Schedule Appointment</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{getCustomerById(appointment.customerId as any)?.name}</TableCell>
                  <TableCell>{getVehicleById(appointment.vehicleId as any)?.make} {getVehicleById(appointment.vehicleId as any)?.model}</TableCell>
                  <TableCell>{getServiceById(appointment.serviceId as any)?.name}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>{appointment.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 