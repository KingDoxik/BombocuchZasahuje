import React, { ReactElement, ReactNode } from 'react'
import Button from './Button'
import Header from './Header'
import {timerState} from '../state/gameState';
import { useRecoilValue } from 'recoil';

interface Props {
    children: ReactNode
}

function GameLayout({ children }: Props): ReactElement {
    const timer = useRecoilValue(timerState);

    return (
        <div className='w-screen min-h-screen flex items-center justify-center p-12'>
            <Header>
                <span className={'text-xl font-extrabold mr-4 font-mono'}>{timer.toFixed(1)}</span>
                <Button onClick={() => window.location.reload()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </Button>
            </Header>
            {
                children
            }
        </div>
    )
}

export default GameLayout
