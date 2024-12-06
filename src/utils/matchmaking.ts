import { Player } from '../types';

interface PlayerHistory {
  player: Player;
  recentOpponents: Set<string>;
}

export class MatchMaker {
  private players: Map<string, PlayerHistory> = new Map();
  private readonly MAX_RECENT_OPPONENTS = 3;
  private readonly RATING_THRESHOLD = 200;

  constructor(playerList: Player[]) {
    playerList.forEach(player => {
      this.players.set(player.name, {
        player,
        recentOpponents: new Set()
      });
    });
  }

  private getValidOpponents(player: Player): Player[] {
    const playerHistory = this.players.get(player.name)!;
    return Array.from(this.players.values())
      .map(history => history.player)
      .filter(opponent => 
        opponent.name !== player.name && 
        !playerHistory.recentOpponents.has(opponent.name) &&
        Math.abs(opponent.smashfactor - player.smashfactor) <= this.RATING_THRESHOLD
      );
  }

  private updateRecentOpponents(player1: Player, player2: Player): void {
    const history1 = this.players.get(player1.name)!;
    const history2 = this.players.get(player2.name)!;

    history1.recentOpponents.add(player2.name);
    history2.recentOpponents.add(player1.name);

    if (history1.recentOpponents.size > this.MAX_RECENT_OPPONENTS) {
      const oldestOpponent = Array.from(history1.recentOpponents)[0];
      history1.recentOpponents.delete(oldestOpponent);
    }

    if (history2.recentOpponents.size > this.MAX_RECENT_OPPONENTS) {
      const oldestOpponent = Array.from(history2.recentOpponents)[0];
      history2.recentOpponents.delete(oldestOpponent);
    }
  }

  public getNextMatch(): [Player, Player] | null {
    const availablePlayers = Array.from(this.players.values())
      .map(history => history.player)
      .sort(() => Math.random() - 0.5);

    for (const player of availablePlayers) {
      const validOpponents = this.getValidOpponents(player);
      
      if (validOpponents.length > 0) {
        const opponent = validOpponents[Math.floor(Math.random() * validOpponents.length)];
        this.updateRecentOpponents(player, opponent);
        return [player, opponent];
      }
    }

    // If no valid matches found with rating threshold, try without it
    for (const player of availablePlayers) {
      const anyOpponent = Array.from(this.players.values())
        .map(history => history.player)
        .find(opponent => 
          opponent.name !== player.name && 
          !this.players.get(player.name)!.recentOpponents.has(opponent.name)
        );

      if (anyOpponent) {
        this.updateRecentOpponents(player, anyOpponent);
        return [player, anyOpponent];
      }
    }

    return null;
  }
}