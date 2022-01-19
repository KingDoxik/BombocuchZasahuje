import { ReactElement } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import EndGameLayout from '../components/EndGameLayout';
import ErrorCard from '../components/ErrorCard';
import { gameState, timerState } from '../state/gameState';
import { realModeState } from '../state/realMode';

export default function EndScreen(): ReactElement {
    const timer = useRecoilValue(timerState);
    const [realMode] = useRecoilState(realModeState);
    const currentGameState = useRecoilValue(gameState);

    if (realMode) {
        return (
            <EndGameLayout>
                <div className='text-center'>
                    <p className='text-4xl'>🤢</p>
                    <p className='mt-4 text-primary-500 font-bold'>KONEC HRY</p>
                    <h1 className='text-2xl font-extrabold max-w-2xl'>
                        <span className='text-red-500'>Prohráli jste!</span> Ve škole sice bomba nebyla, ale váš termín byl bohužel zrušen. Je nám líto.
                    </h1>
                </div>
            </EndGameLayout>
        )
    }

    if (currentGameState === 'won') {
        return (
            <EndGameLayout>
                <div className='text-center'>
                    <p className='text-4xl'>🎉</p>
                    <p className='mt-4 text-primary-500 font-bold'>KONEC HRY</p>
                    <h1 className='text-2xl font-extrabold max-w-2xl'>
                        <span className='text-primary-500'>Vyhráli jste!</span> Zachránili jste den. Nejen, že jste odhalili všechny bomby, získali jste "1" u zkoušky a zvládli jste to vše za <span className='text-primary-500'>{timer.toFixed(1)} sekund</span>. To se jen tak nevidí.
                    </h1>
                </div>
            </EndGameLayout>
        )
    }

    if (currentGameState === 'lost') {
        return (
            <EndGameLayout>
                <div className='text-center'>
                    <p className='text-4xl'>🤬</p>
                    <p className='mt-4 text-primary-500 font-bold'>KONEC HRY</p>
                    <h1 className='text-2xl font-extrabold max-w-2xl'>
                        <span className='text-red-500'>Prohráli jste!</span> Dnes to bohužel nevyšlo. Ještě že těch rezervních poukázek máte dost. Co říkáte, zkusíme to znovu?
                    </h1>
                </div>
            </EndGameLayout>
        )
    }



    return (<ErrorCard />);
}
