import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { Player } from '../types';

interface RankingsProps {
  players: Player[];
}

export function Rankings({ players }: RankingsProps) {
  const sortedPlayers = [...players].sort((a, b) => b.smashfactor - a.smashfactor);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-indigo-600">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Trophy className="mr-2" /> SmashFactor Rankings
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.name}
            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center">
              {index < 3 && (
                <Medal className={`mr-2 ${
                  index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              )}
              <span className="w-8 text-gray-500">{index + 1}.</span>
              <span className="font-medium">{player.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Games: {player.games_played}
              </div>
              <div className="font-semibold text-indigo-600">
                {player.smashfactor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}