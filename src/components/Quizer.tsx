import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { Answer, Question } from '../core/types'
import { questionsState } from '../state/questionsState';
import QuizerAnswerButton from './QuizerAnswerButton'

interface QuizerProps {
    onGameWon: () => void;
    onGameLost: () => void;
}

function Quizer({ onGameWon, onGameLost }: QuizerProps): ReactElement {

    const questions = useRecoilValue(questionsState);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const maxQuestions = useMemo(() => questions.length, [questions]);
    const currentQuestion = useMemo<Question | null>(() => questions.length > 0 ? questions[currentQuestionIndex] : null, [currentQuestionIndex, questions]);

    const nextQuestion = useCallback(() => {
        if (currentQuestionIndex + 1 >= maxQuestions) {
            onGameWon();
            return;
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, [currentQuestionIndex, maxQuestions, setCurrentQuestionIndex, onGameWon])

    const onAnswer = useCallback((answer: Answer) => {
        if (answer.correct) {
            nextQuestion();
            return;
        }
        onGameLost();
    }, [questions, nextQuestion]);

    return (
        <div className='text-center'>
            <span className='text-primary-500 font-bold'>OTÁZKA {currentQuestionIndex + 1} / {maxQuestions}</span>
            <h1 className='text-2xl font-extrabold max-w-2xl'>
                {currentQuestion?.text}
            </h1>
            <div className="mt-12 grid gap-x-6 gap-y-4 grid-cols-2 w-screen max-w-2xl">
                {
                    currentQuestion?.answers.map((answer) => {
                        return (<QuizerAnswerButton key={answer.text} onClick={() => { onAnswer(answer) }}>{answer.text}</QuizerAnswerButton>)
                    })
                }

            </div>
        </div>
    )
}

export default Quizer
