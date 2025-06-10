import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorCode } from "@/types/errorCodes";

interface ErrorCodeCardProps {
  error: ErrorCode;
}

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
  if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800";
  if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Function: "bg-purple-100 text-purple-800",
    Deployment: "bg-orange-100 text-orange-800",
    Runtime: "bg-pink-100 text-pink-800",
    DNS: "bg-cyan-100 text-cyan-800",
    Routing: "bg-indigo-100 text-indigo-800",
    Request: "bg-teal-100 text-teal-800",
    Image: "bg-lime-100 text-lime-800",
    Cache: "bg-amber-100 text-amber-800",
    Internal: "bg-gray-100 text-gray-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export const ErrorCodeCard = ({ error }: ErrorCodeCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono">
            {error.code}
          </CardTitle>
          <Badge className={getStatusColor(error.httpStatus)}>
            {error.httpStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getCategoryColor(error.category)}>
            {error.category}
          </Badge>
          {error.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {error.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};