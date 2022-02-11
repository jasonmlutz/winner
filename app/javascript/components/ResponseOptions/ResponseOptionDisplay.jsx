import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import IconInterface from "../IconInterface";

import {
  handleEditSubmit,
  handleMove,
  handleDelete,
} from "../resources/ObjectActions";

const ResponseOptionDisplay = ({ responseOption, responseOptions }) => {
  const [editActive, setEditActive] = useState(false);
  const [title, setTitle] = useState(responseOption.title);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const path = `/surveys/${responseOption.grandparent_id}/${Date.now()}`;

  useEffect(() => {
    if (editActive) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editActive]);

  const renderResponseOption = () => {
    if (editActive) {
      return (
        <form className="input">
          <input
            type="text"
            className="input__box input__box--small"
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="input__submit input__submit--right-anchor input__submit--small"
            type="submit"
            onClick={(e) =>
              handleEditSubmit(
                e,
                responseOption.id,
                "response_options",
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
        <div className="text__title text__title--small">
          <div className="text__title--icons-right">{responseOption.title}</div>
          <IconInterface
            position={responseOption.position}
            siblingCount={responseOptions.length}
            setEditActive={setEditActive}
            handleMove={handleMove.bind(
              null,
              responseOption,
              responseOptions,
              "response_options",
              navigate,
              path
            )}
            handleDelete={handleDelete.bind(
              null,
              responseOption.id,
              responseOption,
              responseOptions,
              "response_options",
              navigate,
              path
            )}
          />
        </div>
      );
    }
  };

  return <div className="ResponseOptionDisplay">{renderResponseOption()}</div>;
};

export default ResponseOptionDisplay;
