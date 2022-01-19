import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil';
import Quizer from '../components/Quizer';
import TileField from '../components/TileField'
import { MineSweeper } from '../core/minesweeper';
import { gameState, timerState } from '../state/gameState';
import { realModeState } from '../state/realMode';
import { useNavigate } from 'react-router-dom';
import GameLayout from '../components/GameLayout';
import Button from '../components/Button';

export default function GameScreen(): ReactElement {
    const navigate = useNavigate();

    const [realMode] = useRecoilState(realModeState);
    const [currentGameState, setCurrentGameState] = useRecoilState(gameState);

    // Game events
    const gameWon = useCallback(() => {
        setCurrentGameState('won')
        navigate('/result');
    }, [navigate, setCurrentGameState]);

    const gameLost = useCallback(() => {
        setCurrentGameState('lost')
        navigate('/result');
    }, [navigate, setCurrentGameState]);


    // Quizzer
    const startQuiz = useCallback(() => {
        setCurrentGameState('quiz');
    }, [setCurrentGameState]);

    const onQuizLost = useCallback(() => {
        gameLost();
    }, [gameLost]);

    const onQuizWon = useCallback(() => {
        gameWon();
    }, [gameWon]);

    // Mines
    const [fieldsCountX] = useState(parseInt(process.env.REACT_APP_FIELDS_COUNT_X ?? '0'));
    const [fieldsCountY] = useState(parseInt(process.env.REACT_APP_FIELDS_COUNT_Y ?? '0'));
    const [minesCount] = useState(parseInt(process.env.REACT_APP_MINES_COUNT ?? '0'));

    const startMines = useCallback(() => {
        setCurrentGameState('bombs');
    }, [setCurrentGameState]);

    const onMinesLost = useCallback(() => {
        gameLost();
    }, [gameLost]);

    const onMinesWon = useCallback(() => {
        if (realMode) {
            gameWon();
            return;
        }
        startQuiz();
    }, [gameWon, startQuiz, realMode]);

    const mineSweeper = useMemo(() => new MineSweeper(fieldsCountY, fieldsCountX, realMode ? 0 : minesCount, onMinesWon, onMinesLost), [realMode, fieldsCountX, fieldsCountY, minesCount, onMinesWon, onMinesLost])

    // Timer
    const [_, setTimer] = useRecoilState(timerState);
    useEffect(() => {
        let interval: NodeJS.Timer | undefined = undefined;
        if (currentGameState === 'bombs' || currentGameState === 'quiz') {
            interval = setInterval(() => {
                setTimer((time) => time + 0.1);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentGameState, setTimer])

    const restartTimer = useCallback(() => {
        setTimer(0);
    }, [setTimer]);

    // Start game
    const startGame = useCallback(() => {
        async function init() {
            restartTimer();
            startMines();
        }
        init();
    }, [restartTimer, startMines]);

    useEffect(() => {
        startGame();
    }, [startGame])

    if (currentGameState === 'bombs') {
        return (
            <GameLayout>
                <TileField minesweeper={mineSweeper} />
            </GameLayout>
        )
    }

    if (currentGameState === 'quiz') {
        return (
            <GameLayout>
                <Quizer onGameWon={onQuizWon} onGameLost={onQuizLost} />
            </GameLayout>
        )
    }

    return (
        <GameLayout>
            <h2>Nastala chyba při načítání...</h2>
            <Button onClick={window.location.reload}>Zkusit znovu</Button>
        </GameLayout>
    )

}