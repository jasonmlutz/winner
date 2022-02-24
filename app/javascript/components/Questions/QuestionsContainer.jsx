import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NewQuestionForm from "./NewQuestionForm";
import QuestionDisplay from "./QuestionDisplay";

const QuestionsContainer = ({ parent_id }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/surveys/${parent_id}/questions`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`No questions found!`);
        return;
      }

      setQuestions(data);
    }

    fetchData();
    return;
  }, [navigate]);

  const renderQuestionsContainer = () => {
    if (questions.length) {
      const sortedQuestions = questions.sort((a, b) => a.position - b.position);
      return sortedQuestions.map((question) => (
        <li className="border-gray-100 flex flex-row mb-2" key={question.id}>
          <QuestionDisplay question={question} questions={questions} />
        </li>
      ));
    }
  };

  return (
    <>
      {renderQuestionsContainer()}
      <NewQuestionForm parent_id={parent_id} siblingCount={questions.length} />
    </>
  );
};

export default QuestionsContainer;
