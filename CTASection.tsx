import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400 rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands who've discovered the joy of organized living. Start your journey today - it's completely free!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg group"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-8 text-purple-200">
            <p className="text-sm">
              ✨ No credit card required • 📱 Works on all devices • 🔒 Your data stays private
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;