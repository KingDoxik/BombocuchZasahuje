import React, { ReactElement, ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { realModeState } from '../state/realMode';
import Button from './Button';
import Header from './Header'
import Switch from './Switch';

interface Props {
    children: ReactNode
}

function EndGameLayout({ children }: Props): ReactElement {
    const [realMode, setRealMode] = useRecoilState(realModeState);
    const navigate = useNavigate();
    const playAgain = useCallback(() => {
        navigate('/game');
    }, [navigate]);
    return (
        <div className='w-screen min-h-screen flex items-center justify-center p-12 flex-col'>
            <Header>
                <Switch
                    checked={realMode}
                    onChange={setRealMode}
                    label={'Real Mode'}
                />
                <span className="ml-3 text-gray-500">
                    Real Mode
                </span>
            </Header>
            {children}
            <div className='mt-6'>
                <Button onClick={() => playAgain()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>
                        Hrát znovu
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default EndGameLayout
