import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ pathname }) => {
  const navigate = useNavigate();

  return (
    <>
      <div>{pathname} NotFound</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        return home
      </button>
    </>
  );
};

export default NotFound;
