import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const errorCodes = [
  { code: 'NOT_FOUND', type: 'Deployment', status: 404, description: 'The requested resource could not be found' },
  { code: 'DEPLOYMENT_NOT_FOUND', type: 'Deployment', status: 404, description: 'Deployment not found' },
  { code: 'FUNCTION_INVOCATION_FAILED', type: 'Function', status: 500, description: 'Function execution failed' },
  { code: 'FUNCTION_INVOCATION_TIMEOUT', type: 'Function', status: 504, description: 'Function execution timed out' },
  { code: 'DEPLOYMENT_BLOCKED', type: 'Deployment', status: 403, description: 'Deployment is blocked' },
  { code: 'DEPLOYMENT_PAUSED', type: 'Deployment', status: 503, description: 'Deployment is paused' },
  { code: 'INTERNAL_UNEXPECTED_ERROR', type: 'Internal', status: 500, description: 'An unexpected internal error occurred' }
];

const ErrorCodes = () => {
  const [search, setSearch] = useState('');
  
  const filteredCodes = errorCodes.filter(error => 
    error.code.toLowerCase().includes(search.toLowerCase()) ||
    error.description.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: number) => {
    if (status >= 500) return 'bg-red-100 text-red-800';
    if (status >= 400) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Button>
        </Link>
      </div>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Vercel Error Codes</h1>
          <p className="text-gray-600 mb-6">Reference guide for common Vercel deployment errors</p>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search error codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-4">
          {filteredCodes.map((error) => (
            <Card key={error.code}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-mono">{error.code}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{error.type}</Badge>
                    <Badge className={getStatusColor(error.status)}>{error.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{error.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredCodes.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No error codes match your search.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorCodes;