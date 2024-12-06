import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SmashFactor Rankings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}