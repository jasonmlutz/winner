import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { AiOutlineCheckCircle } from "react-icons/ai";

import ResponseOptionsContainer from "../ResponseOptions/ResponseOptionsContainer";
import IconInterface from "../IconInterface";

import {
  handleEditSubmit,
  handleMove,
  handleDelete,
} from "../resources/ObjectActions";

const QuestionDisplay = ({ question, questions }) => {
  const [editActive, setEditActive] = useState(false);
  const [title, setTitle] = useState(question.title);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const path = `/surveys/edit/${question.parent_id}/${Date.now()}`;

  useEffect(() => {
    if (editActive) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editActive]);

  return (
    <div className="w-full shadow select-none bg-gray-800 rounded-md p-2 md:p-4">
      {editActive ? (
        <form className="flex flex-row">
          <input
            type="text"
            className="flex-1 text-black rounded-md px-2 mr-2"
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="hidden md:display px-4 py-2 text-xs xl:text-sm rounded-xl text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            type="submit"
            onClick={(e) =>
              handleEditSubmit(
                e,
                question.id,
                "questions",
                title,
                navigate,
                path,
                setEditActive
              )
            }
          >
            Update
          </button>
          <button
            onClick={(e) =>
              handleEditSubmit(
                e,
                question.id,
                "questions",
                title,
                navigate,
                path,
                setEditActive
              )
            }
            type="submit"
            className="display md:hidden rounded-full p-0 bg-indigo-500 text-white text-3xl hover:bg-indigo-700"
          >
            <AiOutlineCheckCircle />
          </button>
        </form>
      ) : (
        <div className="px-1 flex flex-row justify-between">
          <div className="font-medium text-white">{question.title}</div>
          <div className="flex flex-row text-white text-md">
            <IconInterface
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
                question.id,
                question,
                questions,
                "questions",
                navigate,
                path
              )}
            />
          </div>
        </div>
      )}
      <ResponseOptionsContainer
        parent_id={question.id}
        grandparent_id={question.parent_id}
      />
    </div>
  );
};

export default QuestionDisplay;
