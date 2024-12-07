import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Rankings } from './components/Rankings';
import { MatchMaker } from './components/MatchMaker';
import { savePlayersData, loadPlayersData, saveMatchCount, loadMatchCount } from './utils/storage';
import playersData from './data/players.json';
import { Player } from './types';

export default function App() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = loadPlayersData();
    savePlayersData(savedPlayers)
    return savedPlayers.length > 0 ? savedPlayers : playersData;
  });
  const [matches, setMatches] = useState<number>(() => loadMatchCount());

  if (!players || players.length === 0) {
    return <div>No players available</div>;  // Early return if no players
  }

  function pullData() {
    fetch('api/pullData', {
      method: 'POST',
    }).then(data => data.json())
    .then(data => {
      setPlayers(data)
    });
    fetch('api/pullMatches', {
      method: 'POST',
    }).then(data => data.json())
    .then(data => {
      setMatches(data["count"])
    });
}

  useEffect(() => {
    pullData()
  }, [])

  useEffect(() => {
    savePlayersData(players);
  }, [players]);

  useEffect(() => {
    saveMatchCount(matches);
  }, [matches]);

  const handleMatchComplete = () => {
    setMatches(prev => prev + 1);
    setPlayers([...players]); // Trigger re-render with updated scores
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <MatchMaker 
              players={players}
              onMatchComplete={handleMatchComplete}
            />
            <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Total Matches Played: {matches}
              </h3>
            </div>
          </div>
          <Rankings players={players} />
        </div>
      </div>
    </Layout>
  );
}