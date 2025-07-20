import { AuthGuard } from "@/components/AuthGuard"
import { Toaster } from "@/components/ui/sonner"

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      {children}
      <Toaster />
    </AuthGuard>
  )
} 