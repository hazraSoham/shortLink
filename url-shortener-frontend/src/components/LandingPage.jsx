import React, { useState } from 'react';
import { Link, BarChart, Clock, Shield } from 'lucide-react';
import { useStoreContext } from '../contextApi/ContextApi';
import { useNavigate } from 'react-router-dom';
import ShortenPopUp from './Dashboard/ShortenPopUp';

const LandingPage = () => {

  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  console.log("User Token: " + token)

  const handleCreateShortURL = () => {
    if (token) {
      setShortenPopUp(true);
    } else {
      navigate('/login');
    }
  };

  const dashBoardNavigateHandler = () => {
    navigate('/dashboard');
  }

  const features = [
    {
      icon: <Link className="w-6 h-6 text-blue-500" />,
      title: 'Quick & Easy',
      description: 'Create shortened URLs in seconds with just a few clicks'
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-500" />,
      title: 'Analytics',
      description: 'Track clicks and analyze your link performance'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: 'Link History',
      description: 'Access and manage all your shortened links in one place'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: 'Secure',
      description: 'Enterprise-grade security for your links'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Make Your Links
              <span className="text-blue-600"> Shorter</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Transform long, complex URLs into short, memorable links.
              Track performance and manage all your links in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                onClick={handleCreateShortURL}>
                Create Short Link
              </button>
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg 
                font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                onClick={dashBoardNavigateHandler}>
                Manage Links
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title}
                className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">10M+</div>
              <p className="text-gray-600">Links Shortened</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <p className="text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Render ShortURL only if user is logged in and showShortURL is true */}
      {token && shortenPopUp && 
      <ShortenPopUp
        refetch={true}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />}
    </div>
  );
};

export default LandingPage;