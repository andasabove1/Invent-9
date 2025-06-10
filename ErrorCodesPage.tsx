import { useState, useMemo } from "react";
import { ErrorCodeCard } from "@/components/ErrorCodeCard";
import { ErrorCodeSearch } from "@/components/ErrorCodeSearch";
import { APPLICATION_ERRORS, PLATFORM_ERRORS, ErrorCode } from "@/types/errorCodes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Server, Zap } from "lucide-react";

const ALL_ERRORS = [...APPLICATION_ERRORS, ...PLATFORM_ERRORS];

export const ErrorCodesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const categories = useMemo(() => {
    return Array.from(new Set(ALL_ERRORS.map(error => error.category))).sort();
  }, []);

  const statusCodes = useMemo(() => {
    return Array.from(new Set(ALL_ERRORS.map(error => error.httpStatus))).sort((a, b) => a - b);
  }, []);

  const filteredErrors = useMemo(() => {
    let errors = ALL_ERRORS;
    
    if (activeTab === "application") {
      errors = APPLICATION_ERRORS;
    } else if (activeTab === "platform") {
      errors = PLATFORM_ERRORS;
    }

    return errors.filter(error => {
      const matchesSearch = error.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || error.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || error.httpStatus.toString() === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus, activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Vercel Error Codes</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Complete reference for Vercel deployment and runtime error codes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            All Errors
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Application
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Platform
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>All Error Codes</CardTitle>
              <CardDescription>
                Complete list of both application and platform error codes
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Application Errors</CardTitle>
              <CardDescription>
                Errors related to your application deployment and runtime
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="platform" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Platform Errors</CardTitle>
              <CardDescription>
                Internal Vercel platform errors - contact support if encountered
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <ErrorCodeSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        categories={categories}
        statusCodes={statusCodes}
        totalResults={filteredErrors.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredErrors.map((error) => (
          <ErrorCodeCard key={error.code} error={error} />
        ))}
      </div>

      {filteredErrors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No error codes match your search criteria.</p>
        </div>
      )}
    </div>
  );
};