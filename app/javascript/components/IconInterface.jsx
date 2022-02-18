import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

const IconInterface = ({
  position,
  siblingCount,
  setEditActive,
  handleMove,
  handleDelete,
}) => {
  const renderDownIcon = () => {
    return (
      <BsFillArrowDownCircleFill
        className="mx-0.5 md:mx-1 cursor-pointer hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded-md"
        onClick={() => handleMove("down")}
      />
    );
  };

  const renderUpIcon = () => {
    return (
      <BsFillArrowUpCircleFill
        className="mx-0.5 md:mx-1 cursor-pointer hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded-md"
        onClick={() => handleMove("up")}
      />
    );
  };

  const renderEditIcon = () => {
    return (
      <AiFillEdit
        className="mx-0.5 md:mx-1 cursor-pointer hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded-md"
        onClick={() => setEditActive(true)}
      />
    );
  };

  const renderDeleteIcon = () => {
    return (
      <AiFillDelete
        className="mx-0.5 md:mx-1 cursor-pointer hover:text-gray-200 hover:border hover:border-gray-200 hover:rounded-md"
        onClick={() => handleDelete()}
      />
    );
  };

  const renderIcons = () => {
    if (siblingCount === 1) {
      // only 1 question; return only edit and delete
      return (
        <>
          {renderEditIcon()}
          {renderDeleteIcon()}
        </>
      );
    } else {
      // more than 1 question
      switch (position) {
        case 1:
          // first question, no move up icon
          // for visual consistency, render a space where the
          // move up icon should be
          return (
            <>
              {renderDownIcon()}
              {renderEditIcon()}
              {renderDeleteIcon()}
            </>
          );
        case siblingCount:
          // last question, no move down icon
          return (
            <>
              {renderUpIcon()}
              {renderEditIcon()}
              {renderDeleteIcon()}
            </>
          );
        default:
          // neither first nor last, render all 4
          return (
            <>
              {renderDownIcon()}
              {renderUpIcon()}
              {renderEditIcon()}
              {renderDeleteIcon()}
            </>
          );
      }
    }
  };

  return <>{renderIcons()}</>;
};

export default IconInterface;
