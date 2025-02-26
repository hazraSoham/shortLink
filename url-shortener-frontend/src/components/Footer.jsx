import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const links = [
  //   { name: 'About', href: '#' },
  //   { name: 'Features', href: '#' },
  //   { name: 'Pricing', href: '#' },
  //   { name: 'Blog', href: '#' },
  //   { name: 'Support', href: '#' },
  //   { name: 'Terms', href: '#' },
  //   { name: 'Privacy', href: '#' }
  // ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-xl font-bold text-gray-900">
              short<span className="text-blue-600">Link</span>
            </span>
            <span className="text-sm text-gray-500">
              © {currentYear} All rights reserved
            </span>
          </div>

          {/* Navigation Links */}
          {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 sm:mb-0">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div> */}

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer