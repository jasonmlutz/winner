import React from "react";
import { FiArrowUpCircle } from "react-icons/fi";

const ScrollToTopButton = React.forwardRef((props, ref) => {
  var className =
    "absolute p-4 z-10 inset-x-0 flex flex-row justify-center w-screen transition-[bottom] duration-300 ease-in-out";
  className += props.visible ? " bottom-4" : " -bottom-16";
  return (
    <div className={className}>
      <div
        onClick={() => {
          ref.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="cursor-pointer rounded-full bg-indigo-500 text-white text-3xl hover:bg-indigo-700"
      >
        <FiArrowUpCircle />
      </div>
    </div>
  );
});

export default ScrollToTopButton;
