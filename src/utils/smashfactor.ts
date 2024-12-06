import { Player } from '../types';

export const calculateSmashFactor = (winner: Player, loser: Player): void => {
  const baseK = 32;
  const K = Math.max(baseK - (Math.min(winner.games_played, loser.games_played) / 10), 8);

  const expectedWinner = 1 / (1 + Math.pow(10, (loser.smashfactor - winner.smashfactor) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winner.smashfactor - loser.smashfactor) / 400));

  winner.smashfactor = Math.round(winner.smashfactor + K * (1 - expectedWinner));
  loser.smashfactor = Math.round(loser.smashfactor + K * (0 - expectedLoser));

  winner.games_played += 1;
  loser.games_played += 1;
};