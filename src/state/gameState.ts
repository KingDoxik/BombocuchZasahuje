import { atom } from "recoil";

type GameState = 'not-running' | 'bombs' | 'quiz'  | 'won' | 'lost';

export const gameState = atom<GameState>({
    key: 'gameState',
    default: 'not-running',
});

export const timerState = atom<number>({
    key: 'timerState',
    default: 0,
});