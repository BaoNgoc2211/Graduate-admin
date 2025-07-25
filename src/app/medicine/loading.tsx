import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function MedicineLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-900" />
          <p className="text-gray-600">Đang tải...</p>
        </CardContent>
      </Card>
    </div>
  )
}
