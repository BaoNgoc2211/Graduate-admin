"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function Editor() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-2">
      <label htmlFor="editor" className="text-sm font-medium">Nội dung</label>
      <Textarea
        id="editor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập nội dung tại đây..."
        className="min-h-[150px]"
      />
    </div>
  )
}
