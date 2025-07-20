"use client"

import React, { useState } from "react"
import { Store, Clock, Settings, Users, Package, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ManageStore() {
  const [storeInfo, setStoreInfo] = useState({
    name: "Stoka Inventory",
    description: "Your trusted partner for electronics, furniture, and office supplies",
    address: "123 Commerce Street, Business District, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@stoka.com",
website: "www.stoka.com",
    taxId: "12-3456789",
    currency: "USD",
  })

  const [operatingHours, setOperatingHours] = useState([
    { day: "Monday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Tuesday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Wednesday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Thursday", open: "09:00", close: "20:00", isOpen: true },
    { day: "Friday", open: "09:00", close: "21:00", isOpen: true },
    { day: "Saturday", open: "10:00", close: "18:00", isOpen: true },
    { day: "Sunday", open: "12:00", close: "17:00", isOpen: false },
  ])

  const [settings, setSettings] = useState({
    autoReorder: true,
    lowStockAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    multiLocation: false,
    barcodeScan: true,
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Store</h1>
          <p className="text-gray-600">Configure your store settings and information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Store Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Store Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Store Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeInfo.name}
                onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={storeInfo.description}
                onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={storeInfo.address}
                onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={storeInfo.phone}
                  onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={storeInfo.email}
                  onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={storeInfo.website}
                  onChange={(e) => setStoreInfo({ ...storeInfo, website: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={storeInfo.currency}
                  onValueChange={(value) => setStoreInfo({ ...storeInfo, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {operatingHours.map((schedule, index) => (
              <div key={schedule.day} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={schedule.isOpen}
                    onCheckedChange={(checked) => {
                      const newHours = [...operatingHours]
                      newHours[index].isOpen = checked
                      setOperatingHours(newHours)
                    }}
                  />
                  <span className="font-medium w-20">{schedule.day}</span>
                </div>
                {schedule.isOpen ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={schedule.open}
                      onChange={(e) => {
                        const newHours = [...operatingHours]
                        newHours[index].open = e.target.value
                        setOperatingHours(newHours)
                      }}
                      className="w-24"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={schedule.close}
                      onChange={(e) => {
                        const newHours = [...operatingHours]
                        newHours[index].close = e.target.value
                        setOperatingHours(newHours)
                      }}
                      className="w-24"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">Closed</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Store Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Inventory Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Reorder</Label>
                    <p className="text-sm text-gray-500">Automatically reorder when stock is low</p>
                  </div>
                  <Switch
                    checked={settings.autoReorder}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoReorder: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified when items are running low</p>
                  </div>
                  <Switch
                    checked={settings.lowStockAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Barcode Scanning</Label>
                    <p className="text-sm text-gray-500">Enable barcode scanning for quick entry</p>
                  </div>
                  <Switch
                    checked={settings.barcodeScan}
                    onCheckedChange={(checked) => setSettings({ ...settings, barcodeScan: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Multi-Location Support</Label>
                    <p className="text-sm text-gray-500">Manage multiple store locations</p>
                  </div>
                  <Switch
                    checked={settings.multiLocation}
                    onCheckedChange={(checked) => setSettings({ ...settings, multiLocation: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 