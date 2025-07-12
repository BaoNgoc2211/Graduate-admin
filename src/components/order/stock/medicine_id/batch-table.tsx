import { IStock } from "@/interface/order/stock.interface";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BatchTable: React.FC<{ batches: IStock[] }> = ({ batches }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (d: Date | string | undefined) =>
    d ? new Intl.DateTimeFormat("vi-VN").format(new Date(d)) : "—";

  const isExpiringSoon = (expiry?: Date | string) => {
    if (!expiry) return false;
    const diffDays =
      (new Date(expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays < 60;
  };
  const isExpired = (expiry?: Date | string) =>
    expiry ? new Date(expiry) < new Date() : false;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Lô hàng",
                  "Số lượng",
                  "Giá bán",
                  "Hạn sử dụng",
                  "Ngày nhập",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${
                      h === "" ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {batches.map((b) => (
                <tr
                  key={b._id}
                  className={`group hover:bg-gray-50 transition-colors ${
                    isExpired(b.expiryDate)
                      ? "bg-red-50"
                      : isExpiringSoon(b.expiryDate)
                      ? "bg-orange-50"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {b.batchNumber || `Lô ${b._id?.slice(-6)}`}
                      </span>
                      {isExpired(b.expiryDate) && (
                        <Badge variant="destructive">Hết hạn</Badge>
                      )}
                      {isExpiringSoon(b.expiryDate) &&
                        !isExpired(b.expiryDate) && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800"
                          >
                            Sắp hết hạn
                          </Badge>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {b.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatPrice(b.sellingPrice)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatDate(b.expiryDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(b.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {batches.map((b) => (
          <Card
            key={b._id}
            className={`p-4 rounded-xl shadow-sm border ${
              isExpired(b.expiryDate)
                ? "border-red-200 bg-red-50"
                : isExpiringSoon(b.expiryDate)
                ? "border-orange-200 bg-orange-50"
                : "bg-white"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">
                    {b.batchNumber || `Lô ${b._id?.slice(-6)}`}
                  </h3>
                  {isExpired(b.expiryDate) && (
                    <Badge variant="destructive">Hết hạn</Badge>
                  )}
                  {isExpiringSoon(b.expiryDate) && !isExpired(b.expiryDate) && (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      Sắp hết hạn
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Số lượng:</span>{" "}
                  <span>{b.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-500">Giá bán:</span>{" "}
                  <span>{formatPrice(b.sellingPrice)}</span>
                </div>
                <div>
                  <span className="text-gray-500">HSD:</span>{" "}
                  <span
                    className={isExpired(b.expiryDate) ? "text-red-600" : ""}
                  >
                    {formatDate(b.expiryDate)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Ngày nhập:</span>{" "}
                  <span>{formatDate(b.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
export default BatchTable;
