import React, { useState, useEffect, useRef } from 'react';
import { Swords, X, Pause, Play, AlertTriangle } from 'lucide-react';
import { Player } from '../types';
import { calculateSmashFactor } from '../utils/smashfactor';
import { MatchMaker as MatchMakerUtil } from '../utils/matchmaking';

interface MatchMakerProps {
  players: Player[];
  onMatchComplete: () => void;
}

export function MatchMaker({ players, onMatchComplete }: MatchMakerProps) {
  const [matchPlayers, setMatchPlayers] = useState<[Player, Player] | null>(null);
  const [autoMatch, setAutoMatch] = useState(true);
  const matchMakerRef = useRef<MatchMakerUtil>(new MatchMakerUtil(players));

  useEffect(() => {
    matchMakerRef.current = new MatchMakerUtil(players);
  }, [players]);

  useEffect(() => {
    if (autoMatch && !matchPlayers) {
      getRandomMatch();
    }
  }, [autoMatch, matchPlayers]);

  const getRandomMatch = () => {
    if (players.length < 2) return;
    const match = matchMakerRef.current.getNextMatch();
    if (match) {
      setMatchPlayers(match);
    }
  };

  function sendData(playerData:any) {
    fetch('api/sendData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData)
    })
  }

  const handleWinner = (winner: Player, loser: Player) => {
    calculateSmashFactor(winner, loser);
    sendData([winner, loser])
    onMatchComplete();
    setMatchPlayers(null);
  };

  const handleNoShow = () => {
    if (matchPlayers) {
      const [player1, player2] = matchPlayers;
      player1.smashfactor = Math.max(0, player1.smashfactor - 10);
      player2.smashfactor = Math.max(0, player2.smashfactor - 10);
      sendData([player1, player2])
      onMatchComplete();
      setMatchPlayers(null);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Match Maker</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setAutoMatch(!autoMatch)}
            className={`px-4 py-2 ${
              autoMatch ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'
            } text-white rounded-md flex items-center`}
          >
            {autoMatch ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {autoMatch ? 'Pause Auto-Match' : 'Resume Auto-Match'}
          </button>
          {!autoMatch && (
            <button
              onClick={getRandomMatch}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              <Swords className="mr-2" /> New Match
            </button>
          )}
        </div>
      </div>

      {matchPlayers ? (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h3 className="font-semibold text-lg">{matchPlayers[0].name}</h3>
              <p className="text-gray-600">SF: {matchPlayers[0].smashfactor}</p>
            </div>
            <div className="px-4">
              <span className="text-2xl font-bold text-gray-400">VS</span>
            </div>
            <div className="text-center flex-1">
              <h3 className="font-semibold text-lg">{matchPlayers[1].name}</h3>
              <p className="text-gray-600">SF: {matchPlayers[1].smashfactor}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleWinner(matchPlayers[0], matchPlayers[1])}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {matchPlayers[0].name} Wins
            </button>
            <button
              onClick={handleNoShow}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
            >
              <X className="mr-2" /> No Show
            </button>
            <button
              onClick={() => handleWinner(matchPlayers[1], matchPlayers[0])}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {matchPlayers[1].name} Wins
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
          <p>Waiting for next match...</p>
        </div>
      )}
    </div>
  );
}