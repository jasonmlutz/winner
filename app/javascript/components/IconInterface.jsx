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
      <div className="text__icon">
        <BsFillArrowDownCircleFill onClick={() => handleMove("down")} />
      </div>
    );
  };

  const renderUpIcon = () => {
    return (
      <div className="text__icon">
        <BsFillArrowUpCircleFill onClick={() => handleMove("up")} />
      </div>
    );
  };

  const renderEditIcon = () => {
    return (
      <div className="text__icon">
        <AiFillEdit onClick={() => setEditActive(true)} />
      </div>
    );
  };

  const renderDeleteIcon = () => {
    return (
      <div className="text__icon">
        <AiFillDelete onClick={() => handleDelete()} />
      </div>
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
              <div className="text__icon--empty-placeholder"></div>
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
