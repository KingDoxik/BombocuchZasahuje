import EndScreen from "./screens/EndScreen";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentSubjectState, questionsState } from "./state/questionsState";
import { useRecoilState } from "recoil";
import { Response } from "./core/types";
import ErrorCard from "./components/ErrorCard";

function App() {

  const [_, setCurrentSubject] = useRecoilState(currentSubjectState)
  const [__, setQuestions] = useRecoilState(questionsState);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [questionsLoadingError, setQuestionsLoadingError] = useState<boolean>(false);

  const loadQuestions = async () => {
    setQuestionsLoading(true);
    try {
      const quesetionsResponse = await fetch('/questions.json');
      const fetchedQuestions: Response = await quesetionsResponse.json();
      const newSubject = fetchedQuestions.subjects[Math.round(Math.random() * (fetchedQuestions.subjects.length - 1))];
      setCurrentSubject(newSubject);
      setQuestions(fetchedQuestions.questions[newSubject.id]);
    } catch (e) {
      setQuestionsLoadingError(true);
    }
    setQuestionsLoading(false);
  }

  useEffect(() => {
    loadQuestions();
  }, [])

  if (questionsLoading) {
    return (<div></div>)
  }

  if (questionsLoadingError) {
    return (
      <ErrorCard />
    )
  }

  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/result" element={<EndScreen />} />
    </Routes>
  );
}

export default App;
