import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Package, Search, Bell, Share2, FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">InventoryPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/error-codes">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Error Codes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            Smart Inventory Management
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Inventory with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track, organize, and optimize your inventory with intelligent features, automated notifications, and seamless sharing capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to manage your inventory efficiently</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Search className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>Find items instantly with AI-powered search</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Bell className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle>Expiry Alerts</CardTitle>
                <CardDescription>Never miss expiration dates with smart notifications</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Share2 className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle>Easy Sharing</CardTitle>
                <CardDescription>Share inventory lists with team members</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="w-6 h-6" />
            <span className="text-lg font-semibold">InventoryPro</span>
          </div>
          <p className="text-gray-400">© 2024 InventoryPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;