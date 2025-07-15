import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat Management | Admin Dashboard",
  description: "Manage customer conversations and provide real-time support",
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
