import React from 'react';
import { Card, CardContent } from './ui/card';
import { Camera, Package, Heart, Users, Smartphone, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-purple-600" />,
      title: "Photo-Based Cataloging",
      description: "Simply snap photos of your items. Our smart system helps you organize everything with tags and descriptions."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Marketplace Integration",
      description: "Connect directly to Facebook Marketplace, eBay, and local selling platforms. Turn clutter into cash effortlessly."
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "Donation Tracking",
      description: "Easily donate items to your favorite charities. Track your giving and make a positive impact."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Family Sharing",
      description: "Plan distributions to family and friends for special occasions, moves, or life events."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From chaos to clarity - manage your possessions like never before
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;