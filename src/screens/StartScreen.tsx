import { ReactElement, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { realModeState } from '../state/realMode'
import { useRecoilState } from 'recoil'
import Switch from '../components/Switch'
import Header from '../components/Header'
import { currentSubjectState } from '../state/questionsState'

export default function StartScreen(): ReactElement {
    const navigate = useNavigate();

    const startGame = useCallback(() => {
        navigate(`/game`);
    }, [navigate]);

    const [realMode, setRealMode] = useRecoilState(realModeState);
    const [subject] = useRecoilState(currentSubjectState);

    return (
        <div className="h-screen flex flex-col justify-center items-center p-6">
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
            <h1 className="text-5xl font-extrabold max-w-4xl text-center text-gray-900">Poslední zkouškový termín z <span className="text-primary-500">{subject?.name}</span>, ve škole byla nahlášena bomba, bombočuch nikde.</h1>
            <p className="text-md text-gray-600 max-w-lg text-center mt-4">
                Nahraď bombočucha a najdi všechny bomby za něj. Udělej zkoušku a staň se hrdinou dne.
            </p>
            <div className="mt-8">
                <Button onClick={startGame}>SPUSTIT HRU</Button>
            </div>
        </div>
    )
}

