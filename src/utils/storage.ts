import { Player } from '../types';

export const savePlayersData = (players: Player[]) => {
  localStorage.setItem('players', JSON.stringify(players));
};

export const loadPlayersData = (): Player[] => {
  const data = localStorage.getItem('players');
  return data ? JSON.parse(data) : [];
};

export const saveMatchCount = (count: number) => {
  localStorage.setItem('matches', count.toString());
};

export const loadMatchCount = (): number => {
  return parseInt(localStorage.getItem('matches') || '0', 10);
};