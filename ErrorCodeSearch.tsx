import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorCodeSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  categories: string[];
  statusCodes: number[];
  totalResults: number;
}

export const ErrorCodeSearch = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories,
  statusCodes,
  totalResults
}: ErrorCodeSearchProps) => {
  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("all");
    onStatusChange("all");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedStatus !== "all";

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search error codes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status Codes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status Codes</SelectItem>
            {statusCodes.map((status) => (
              <SelectItem key={status} value={status.toString()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} size="sm">
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="secondary">
          {totalResults} error{totalResults !== 1 ? 's' : ''} found
        </Badge>
      </div>
    </div>
  );
};