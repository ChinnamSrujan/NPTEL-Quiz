import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © 2024 Conservation Geography Quiz Platform. Built with MERN Stack.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-xs text-gray-500">
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                120 Questions Available
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Made with ❤️ for Conservation Education
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;