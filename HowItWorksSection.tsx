import React from 'react';
import { Card, CardContent } from './ui/card';
import { Camera, Tag, Share2, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Camera className="w-12 h-12 text-white" />,
      title: "Snap & Catalog",
      description: "Take photos of your belongings. Add descriptions, tags, and categories to build your personal inventory.",
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <Tag className="w-12 h-12 text-white" />,
      title: "Organize & Value",
      description: "Sort items by room, category, or value. Track what you own and discover hidden treasures.",
      color: "bg-gradient-to-br from-blue-500 to-purple-500"
    },
    {
      icon: <Share2 className="w-12 h-12 text-white" />,
      title: "Sell, Donate, Share",
      description: "List items on marketplaces, donate to charities, or plan distributions to family and friends.",
      color: "bg-gradient-to-br from-green-500 to-blue-500"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-white" />,
      title: "Live Organized",
      description: "Enjoy a clutter-free life with everything tracked, valued, and purposefully placed.",
      color: "bg-gradient-to-br from-pink-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your relationship with your possessions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;