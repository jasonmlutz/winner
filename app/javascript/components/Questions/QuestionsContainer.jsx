import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import NewQuestionForm from "./NewQuestionForm";
import QuestionDisplay from "./QuestionDisplay";

const QuestionsContainer = ({ parent_id }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/v1/surveys/${parent_id}/questions`);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const renderQuestionsContainer = () => {
    if (questions.length) {
      const sortedQuestions = questions.sort((a, b) => a.position - b.position);
      return (
        <>
          <ul>
            {sortedQuestions.map((question) => (
              <li key={question.id}>
                <QuestionDisplay question={question} questions={questions} />
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <div className="QuestionsContainer">
      {renderQuestionsContainer()}
      <NewQuestionForm parent_id={parent_id} siblingCount={questions.length} />
    </div>
  );
};

export default QuestionsContainer;
