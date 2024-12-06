import React from 'react';
import { Menu, Trophy } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-white mr-2" />
            <span className="text-xl font-bold text-white">SmashFactor Rankings</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-gray-200">Rankings</a>
            <a href="#" className="text-white hover:text-gray-200">Match History</a>
            <a href="#" className="text-white hover:text-gray-200">Players</a>
          </nav>
          <div className="md:hidden">
            <button className="p-2">
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}