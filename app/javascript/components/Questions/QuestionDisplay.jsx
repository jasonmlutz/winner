import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import ResponseOptionsContainer from "../ResponseOptions/ResponseOptionsContainer";
import IconInterface from "../IconInterface";

// import {
//   handleEditSubmit,
//   handleMove,
//   handleDelete,
// } from "../../resources/ObjectActions";

const QuestionDisplay = ({ question, questions }) => {
  const [editActive, setEditActive] = useState(false);
  const [title, setTitle] = useState(question.title);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const path = `/surveys/${question.parentId}/${Date.now()}`;

  useEffect(() => {
    if (editActive) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editActive]);

  const renderQuestion = () => {
    if (editActive) {
      return (
        <form className="input">
          <input
            type="text"
            className="input__box input__box--medium"
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="input__submit input__submit--right-anchor input__submit--medium"
            type="submit"
            onClick={(e) =>
              handleEditSubmit(
                e,
                question._id,
                "questions",
                title,
                navigate,
                path,
                setEditActive
              )
            }
          >
            GO
          </button>
        </form>
      );
    } else {
      return (
        <div className="text__title text__title--medium">
          <div className="text__title--icons-right">{question.title}</div>
          {<IconInterface />}
          {/* <IconInterface
            position={question.position}
            siblingCount={questions.length}
            setEditActive={setEditActive}
            handleMove={handleMove.bind(
              null,
              question,
              questions,
              "questions",
              navigate,
              path
            )}
            handleDelete={handleDelete.bind(
              null,
              question._id,
              question,
              questions,
              "questions",
              navigate,
              path
            )}
          /> */}
        </div>
      );
    }
  };

  return (
    <div className="QuestionDisplay">
      {renderQuestion()}
      <ResponseOptionsContainer
        parentId={question._id}
        grandparentId={question.parentId}
      />
    </div>
  );
};

export default QuestionDisplay;
