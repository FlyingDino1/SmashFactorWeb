export interface Player {
  name: string;
  smashfactor: number;
  games_played: number;
}

export interface MatchResult {
  winner: Player;
  loser: Player;
}