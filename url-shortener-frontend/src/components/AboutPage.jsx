import React from 'react';
import { Link, Clock, Shield, BarChart } from 'lucide-react';


const AboutPage = () => {
  const features = [
    {
      icon: <Link className="w-6 h-6 text-blue-500" />,
      title: 'Quick Shortening',
      description: 'Transform long URLs into short, memorable links in seconds'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: 'Link Management',
      description: 'Track link expiration and manage all your shortened URLs in one place'
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-500" />,
      title: 'Analytics',
      description: 'Get detailed insights into link performance and click-through rates'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            Welcome to <span className="text-blue-600">Short</span>Link
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Simplify your links, amplify your reach. ShortLink transforms lengthy URLs into 
            concise, trackable links that make sharing easier than ever.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShortLink?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste Your URL</h3>
              <p className="text-gray-600">
                Simply paste your long URL into our shortener input field
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Short Link</h3>
              <p className="text-gray-600">
                Click shorten and receive your compact, shareable link instantly
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Manage</h3>
              <p className="text-gray-600">
                Monitor link performance and manage all your shortened URLs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10M+</div>
              <p className="text-gray-600">Links Shortened</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <p className="text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutPage;