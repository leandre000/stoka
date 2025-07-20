"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Settings, DollarSign, Clock, Users, Trash2, Edit, Save, X } from "lucide-react"
import { toast } from "sonner"

interface CustomField {
  id: string
  name: string
  type: "text" | "number" | "select" | "textarea" | "date" | "email" | "phone"
  required: boolean
  options?: string[] // For select type
  placeholder?: string
}

interface Service {
  id: string
  name: string
  description: string
  category: string
  price: string
  duration: string
  status: "active" | "inactive"
  teamSize: number
  customFields: { [key: string]: any }
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "IT Consulting",
      description: "Comprehensive IT consulting services for businesses",
      category: "Consulting",
      price: "$150/hour",
      duration: "Flexible",
      status: "active",
      teamSize: 3,
      customFields: {}
    },
    {
      id: "2",
      name: "Technical Support",
      description: "24/7 technical support and troubleshooting",
      category: "Support",
      price: "$75/hour",
      duration: "24/7",
      status: "active",
      teamSize: 5,
      customFields: {}
    },
    {
      id: "3",
      name: "Training Session",
      description: "Employee training and skill development",
      category: "Training",
      price: "$200/session",
      duration: "4 hours",
      status: "inactive",
      teamSize: 2,
      customFields: {}
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showCustomFields, setShowCustomFields] = useState(false)
  const [customFields, setCustomFields] = useState<CustomField[]>([])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    status: "active",
    teamSize: 1,
    customFields: {}
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description) {
      toast.error("Please fill in all required fields")
      return
    }

    const newService: Service = {
      id: editingService ? editingService.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      duration: formData.duration,
      status: formData.status as "active" | "inactive",
      teamSize: formData.teamSize
    }

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? newService : s))
      toast.success("Service updated successfully!")
      console.log("Updated service:", newService)
    } else {
      setServices([...services, newService])
      toast.success("Service added successfully!")
      console.log("Added service:", newService)
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      duration: "",
      status: "active",
      teamSize: 1
    })
    setShowForm(false)
    setEditingService(null)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration,
      status: service.status,
      teamSize: service.teamSize,
      customFields: service.customFields
    })
    setShowForm(true)
  }

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      name: "",
      type: "text",
      required: false,
      placeholder: ""
    }
    setCustomFields([...customFields, newField])
  }

  const updateCustomField = (id: string, field: Partial<CustomField>) => {
    setCustomFields(customFields.map(f => f.id === id ? { ...f, ...field } : f))
  }

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(f => f.id !== id))
  }

  const saveCustomFields = () => {
    if (customFields.some(f => !f.name)) {
      toast.error("All custom fields must have a name")
      return
    }
    setShowCustomFields(false)
    toast.success("Custom fields saved successfully!")
  }

  return (
    <div className="flex-1 space-y-3 py-2 pr-4 md:pr-8 lg:pr-12 xl:pr-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your service offerings and operations</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant={service.status === "active" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{service.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-green-600">{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="font-medium">{service.teamSize} people</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => handleEdit(service)}
                  >
                    Edit Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Form Sidebar */}
        {showForm && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{editingService ? "Edit Service" : "Add New Service"}</CardTitle>
              <CardDescription>
                {editingService ? "Update service information" : "Add a new service to your portfolio"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter service name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the service"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Implementation">Implementation</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., $150/hour"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 4 hours"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="1"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
                    placeholder="Number of team members"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Fields Section */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Custom Fields</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCustomFields(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Manage Fields
                    </Button>
                  </div>
                  
                  {customFields.length > 0 && (
                    <div className="space-y-3">
                      {customFields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id}>{field.name} {field.required && "*"}</Label>
                          {field.type === "text" && (
                            <Input
                              id={field.id}
                              placeholder={field.placeholder}
                              value={formData.customFields[field.name] || ""}
                              onChange={(e) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: e.target.value }
                              })}
                              required={field.required}
                            />
                          )}
                          {field.type === "number" && (
                            <Input
                              id={field.id}
                              type="number"
                              placeholder={field.placeholder}
                              value={formData.customFields[field.name] || ""}
                              onChange={(e) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: e.target.value }
                              })}
                              required={field.required}
                            />
                          )}
                          {field.type === "textarea" && (
                            <Textarea
                              id={field.id}
                              placeholder={field.placeholder}
                              value={formData.customFields[field.name] || ""}
                              onChange={(e) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: e.target.value }
                              })}
                              required={field.required}
                            />
                          )}
                          {field.type === "select" && field.options && (
                            <Select
                              value={formData.customFields[field.name] || ""}
                              onValueChange={(value) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: value }
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          {field.type === "date" && (
                            <Input
                              id={field.id}
                              type="date"
                              value={formData.customFields[field.name] || ""}
                              onChange={(e) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: e.target.value }
                              })}
                              required={field.required}
                            />
                          )}
                          {field.type === "email" && (
                            <Input
                              id={field.id}
                              type="email"
                              placeholder={field.placeholder}
                              value={formData.customFields[field.name] || ""}
                              onChange={(e) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: e.target.value }
                              })}
                              required={field.required}
                            />
                          )}
                          {field.type === "phone" && (
                            <Input
                              id={field.id}
                              type="tel"
                              placeholder={field.placeholder}
                              value={formData.customFields[field.name] || ""}
                              onChange={(e) => setFormData({
                                ...formData,
                                customFields: { ...formData.customFields, [field.name]: e.target.value }
                              })}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingService ? "Update Service" : "Add Service"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingService(null)
                      setFormData({
                        name: "",
                        description: "",
                        category: "",
                        price: "",
                        duration: "",
                        status: "active",
                        teamSize: 1
                      })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        {!showForm && (
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{services.length}</p>
                    <p className="text-sm text-gray-600">Total Services</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {services.filter(s => s.status === "active").length}
                    </p>
                    <p className="text-sm text-gray-600">Active Services</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {services.reduce((acc, s) => acc + s.teamSize, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Team Members</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Custom Fields Management Dialog */}
      {showCustomFields && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Manage Custom Fields</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomFields(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Create custom fields for your services. These fields will appear in the service form.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {customFields.map((field) => (
                <Card key={field.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field Name *</Label>
                      <Input
                        value={field.name}
                        onChange={(e) => updateCustomField(field.id, { name: e.target.value })}
                        placeholder="e.g., Client Requirements"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateCustomField(field.id, { type: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="textarea">Text Area</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Placeholder</Label>
                      <Input
                        value={field.placeholder || ""}
                        onChange={(e) => updateCustomField(field.id, { placeholder: e.target.value })}
                        placeholder="Optional placeholder text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Required</Label>
                      <Select
                        value={field.required ? "true" : "false"}
                        onValueChange={(value) => updateCustomField(field.id, { required: value === "true" })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {field.type === "select" && (
                      <div className="md:col-span-2 space-y-2">
                        <Label>Options (comma-separated)</Label>
                        <Input
                          value={field.options?.join(", ") || ""}
                          onChange={(e) => updateCustomField(field.id, { 
                            options: e.target.value.split(",").map(opt => opt.trim()).filter(opt => opt)
                          })}
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomField(field.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Field
                    </Button>
                  </div>
                </Card>
              ))}
              
              <div className="flex justify-between pt-4">
                <Button onClick={addCustomField} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Field
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setShowCustomFields(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveCustomFields}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Fields
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 