"use client";

import {
  Archive,
  Download,
  Upload,
  FileText,
  Database,
  Shield,
  Bell,
  HelpCircle,
  Trash2,
  RefreshCw,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Others() {
  const quickActions = [
    {
      title: "Backup Data",
      description: "Create a complete backup of your product inventory data",
      icon: Archive,
      action: "Create Backup",
      variant: "default" as const,
      status: "Ready",
    },
    {
      title: "Import Products",
      description: "Import products from CSV or Excel files",
      icon: Upload,
      action: "Import Data",
      variant: "outline" as const,
      status: "Available",
    },
    {
      title: "Export Reports",
      description: "Export comprehensive product and sales reports",
      icon: Download,
      action: "Export All",
      variant: "outline" as const,
      status: "Available",
    },
    {
      title: "System Logs",
      description: "View system activity and error logs",
      icon: FileText,
      action: "View Logs",
      variant: "outline" as const,
      status: "12 New",
    },
  ];

  const systemTools = [
    {
      title: "Database Management",
      description: "Optimize and maintain database performance",
      icon: Database,
      status: "Healthy",
      lastRun: "2 hours ago",
    },
    {
      title: "Security Center",
      description: "Manage security settings and access controls",
      icon: Shield,
      status: "Secure",
      lastRun: "1 day ago",
    },
    {
      title: "Notification Center",
      description: "Configure alerts and notification preferences",
      icon: Bell,
      status: "15 Active",
      lastRun: "Just now",
    },
    {
      title: "Data Cleanup",
      description: "Clean up old records and optimize storage",
      icon: Trash2,
      status: "Pending",
      lastRun: "1 week ago",
    },
  ];

  const maintenanceTools = [
    {
      title: "Clear Cache",
      description: "Clear system cache to improve performance",
      action: "Clear Now",
    },
    {
      title: "Rebuild Index",
      description: "Rebuild database indexes for better performance",
      action: "Rebuild",
    },
    {
      title: "Update System",
      description: "Check for and install system updates",
      action: "Check Updates",
    },
    {
      title: "Reset Settings",
      description: "Reset all settings to default values",
      action: "Reset",
      danger: true,
    },
  ];

  const [showConfirm, setShowConfirm] = useState<{ open: boolean; action: string | null }>({ open: false, action: null });
  const [showModal, setShowModal] = useState<{ open: boolean; content: string | null }>({ open: false, content: null });
  const [importFile, setImportFile] = useState<File | null>(null);

  // Helper for copy
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Quick Actions handlers
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Create Backup":
        toast.success("Backup created successfully!");
        break;
      case "Import Data":
        setShowModal({ open: true, content: "import" });
        break;
      case "Export All":
        toast.success("Reports exported!");
        break;
      case "View Logs":
        setShowModal({ open: true, content: "logs" });
        break;
      default:
        toast("Action not implemented");
    }
  };

  // System Management handlers
  const handleSystemTool = (tool: string) => {
    if (tool === "Data Cleanup") {
      setShowConfirm({ open: true, action: "Data Cleanup" });
    } else {
      toast.info(`${tool} configuration opened (placeholder)`);
    }
  };

  // Maintenance handlers
  const handleMaintenance = (tool: string) => {
    if (tool === "Reset Settings") {
      setShowConfirm({ open: true, action: "Reset Settings" });
    } else {
      toast.success(`${tool} completed!`);
    }
  };

  // Confirm destructive actions
  const handleConfirm = () => {
    if (showConfirm.action === "Reset Settings") {
      toast.success("Settings reset to default!");
    } else if (showConfirm.action === "Data Cleanup") {
      toast.success("Data cleanup completed!");
    }
    setShowConfirm({ open: false, action: null });
  };

  // Modal close
  const handleCloseModal = () => {
    setShowModal({ open: false, content: null });
    setImportFile(null);
  };

  // Import file handler
  const handleImport = () => {
    if (importFile) {
      toast.success(`Imported: ${importFile.name}`);
      handleCloseModal();
    } else {
      toast.error("No file selected");
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product System Tools & Utilities</h1>
          <p className="text-gray-600">Additional tools and maintenance options for your product portal</p>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <action.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{action.status}</Badge>
                  <Button variant={action.variant} size="sm" onClick={() => handleQuickAction(action.action)}>
                    {action.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Management */}
      <Card>
        <CardHeader>
          <CardTitle>System Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemTools.map((tool) => (
              <div
                key={tool.title}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <tool.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tool.title}</h3>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                    <p className="text-xs text-gray-400">Last run: {tool.lastRun}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{tool.status}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleSystemTool(tool.title)}>
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenanceTools.map((tool) => (
              <div key={tool.title} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{tool.title}</h4>
                    <p className="text-xs text-gray-500">{tool.description}</p>
                  </div>
                </div>
                <Button variant={tool.danger ? "destructive" : "outline"} size="sm" className="w-full" onClick={() => handleMaintenance(tool.title)}>
                  {tool.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              📚 Documentation
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              🎥 Video Tutorials
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              💬 Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              🐛 Report Issue
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              💡 Feature Request
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium flex items-center gap-2">v2.1.0 <Button variant="ghost" size="icon" onClick={() => handleCopy("v2.1.0")}> <Copy className="h-4 w-4" /> </Button></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Database:</span>
              <span className="font-medium flex items-center gap-2"><Badge className="bg-green-100 text-green-800">Connected</Badge> <Button variant="ghost" size="icon" onClick={() => handleCopy("Connected")}> <Copy className="h-4 w-4" /> </Button></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Storage Used:</span>
              <span className="font-medium flex items-center gap-2">78% <Button variant="ghost" size="icon" onClick={() => handleCopy("78%")}> <Copy className="h-4 w-4" /> </Button></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Backup:</span>
              <span className="font-medium flex items-center gap-2">2 hours ago <Button variant="ghost" size="icon" onClick={() => handleCopy("2 hours ago")}> <Copy className="h-4 w-4" /> </Button></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Uptime:</span>
              <span className="font-medium flex items-center gap-2">15 days <Button variant="ghost" size="icon" onClick={() => handleCopy("15 days")}> <Copy className="h-4 w-4" /> </Button></span>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => toast.success("System health: All systems operational!")}>System Health Check</Button>
          </CardContent>
        </Card>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirm.open} onOpenChange={(open) => setShowConfirm({ open, action: showConfirm.action })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. Proceed with {showConfirm.action}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm({ open: false, action: null })}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirm}>Yes, Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal for Import/Logs */}
      <Dialog open={showModal.open} onOpenChange={handleCloseModal}>
        <DialogContent>
          {showModal.content === "import" && (
            <>
              <DialogHeader>
                <DialogTitle>Import Products</DialogTitle>
              </DialogHeader>
              <Input type="file" accept=".csv,.xlsx" onChange={e => setImportFile(e.target.files?.[0] || null)} />
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                <Button onClick={handleImport}>Import</Button>
              </DialogFooter>
            </>
          )}
          {showModal.content === "logs" && (
            <>
              <DialogHeader>
                <DialogTitle>System Logs</DialogTitle>
              </DialogHeader>
              <div className="max-h-60 overflow-y-auto text-xs bg-gray-100 p-2 rounded">[Mock] System log entries...</div>
              <DialogFooter>
                <Button onClick={handleCloseModal}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 