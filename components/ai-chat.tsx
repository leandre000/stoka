"use client"

import React, { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Loader2, MessageCircle, Paperclip, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const placeholderResponses = [
  "Hello! How can I assist you today?",
  "I'm here to help with your inventory, suppliers, or reports.",
  "You can ask me about products, services, or system settings.",
  "For more advanced help, contact support or check the documentation.",
  "Let me know if you need a quick summary or a detailed report!"
]

function getRandomResponse() {
  return placeholderResponses[Math.floor(Math.random() * placeholderResponses.length)]
}

export function AIChat({ fullPage = false }: { fullPage?: boolean }) {
  const [open, setOpen] = useState(fullPage)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aiChatMessages")
      if (saved) return JSON.parse(saved)
    }
    return [
      { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" }
    ]
  })
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, open, minimized])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aiChatMessages", JSON.stringify(messages))
    }
  }, [messages])

  // Improved context summary: last 3 user and assistant messages
  const lastMessages = messages.slice(-6)
  const contextSummary = lastMessages.length > 0
    ? lastMessages.map((m, i) => `${m.role === "user" ? "User" : "AI"} #${lastMessages.length - i}: ${m.content}`).join("\n")
    : "No recent context."

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() && uploadedFiles.length === 0) return
    if (input.trim()) {
      setMessages((msgs) => [...msgs, { role: "user", content: input }])
    }
    if (uploadedFiles.length > 0) {
      setMessages((msgs) => [
        ...msgs,
        ...uploadedFiles.map((file) => ({ role: "user", content: `Uploaded file: ${file.name}` }))
      ])
      toast.success(`${uploadedFiles.length} file(s) uploaded!`)
      setUploadedFiles([])
    }
    setInput("")
    setLoading(true)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: getRandomResponse() }
      ])
      setLoading(false)
    }, 1200)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(files)
      if (files.length > 0) {
        toast.success(`${files.length} file(s) selected for upload.`)
      } else {
        toast.error("No files selected.")
      }
    }
  }

  // Floating widget trigger
  if (!fullPage) {
    if (minimized) {
    return (
        <div className="fixed bottom-6 right-6 z-50">
      <Button
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 h-14 w-14 flex items-center justify-center"
            onClick={() => { setOpen(true); setMinimized(false) }}
            aria-label="Open AI Chat Assistant"
          >
            <MessageCircle className="h-7 w-7 text-white" />
      </Button>
        </div>
    )
  }
  return (
      <>
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 h-14 w-14 flex items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label="Open AI Chat Assistant"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </Button>
        </div>
        {open && (
          <div className="fixed bottom-24 right-6 z-50 w-96 max-w-full">
            <Card className="shadow-2xl border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg">AI Chat Assistant</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setMinimized(true)} aria-label="Minimize chat">
                    <span className="text-xl">_</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-4 py-2 border-b bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 whitespace-pre-line">
                  <span className="font-semibold">Recent Context:</span>
                  <br />{contextSummary}
                          </div>
                <div ref={chatRef} className="h-80 overflow-y-auto px-4 py-2 bg-gray-50 dark:bg-gray-900">
                  {messages.map((msg, i) => (
                    <div key={i} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`rounded-lg px-4 py-2 max-w-xs text-sm ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}>
                        {msg.content}
                    </div>
                  </div>
                ))}
                  {loading && (
                    <div className="flex justify-start mb-3">
                      <div className="rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSend} className="flex items-center border-t p-2 bg-white dark:bg-gray-950 gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                      aria-label="Upload file"
                    />
                    <Paperclip className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                  </label>
                  <Input
                    className="flex-1 rounded-full"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSend(e) }}
                    aria-label="Type your message"
                  />
                  <Button type="submit" disabled={loading || (!input.trim() && uploadedFiles.length === 0)} className="rounded-full h-10 w-10 p-0">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </form>
                {uploadedFiles.length > 0 && (
                  <div className="px-4 py-2 text-xs text-gray-500 flex flex-wrap gap-2 border-t bg-gray-50 dark:bg-gray-900">
                    {uploadedFiles.map((file, i) => (
                      <span key={i} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        <FileText className="h-3 w-3" /> {file.name}
                      </span>
                    ))}
                  </div>
                )}
          </CardContent>
        </Card>
          </div>
        )}
      </>
    )
  }

  // Full-page chat experience
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-2xl mx-auto my-4 rounded-xl shadow-lg border bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-blue-600" />
          <span className="font-bold text-lg">AI Chat Assistant</span>
        </div>
      </div>
      <div className="px-6 py-2 border-b bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 whitespace-pre-line">
        <span className="font-semibold">Recent Context:</span>
        <br />{contextSummary}
      </div>
      <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`rounded-lg px-4 py-2 max-w-xs text-sm ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Thinking...
            </div>
          </div>
        )}
        </div>
      <form onSubmit={handleSend} className="flex items-center border-t p-4 bg-white dark:bg-gray-950 gap-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            aria-label="Upload file"
          />
          <Paperclip className="h-5 w-5 text-blue-600 hover:text-blue-800" />
        </label>
        <Input
          className="flex-1 rounded-full"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSend(e) }}
          aria-label="Type your message"
        />
        <Button type="submit" disabled={loading || (!input.trim() && uploadedFiles.length === 0)} className="rounded-full h-12 w-12 p-0">
          {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
          </Button>
        </form>
      {uploadedFiles.length > 0 && (
        <div className="px-6 py-2 text-xs text-gray-500 flex flex-wrap gap-2 border-t bg-gray-50 dark:bg-gray-900">
          {uploadedFiles.map((file, i) => (
            <span key={i} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              <FileText className="h-3 w-3" /> {file.name}
            </span>
          ))}
      </div>
      )}
    </div>
  )
} 