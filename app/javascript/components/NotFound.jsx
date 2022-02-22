import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({
  path = "/",
  notFoundMessage = "Resource not found",
  navLinkMessage = "Return home",
}) => {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
        className="absolute h-full w-full object-cover"
      />
      <div className="inset-0 bg-black opacity-75 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          <h1 className="font-extrabold text-3xl lg:text-4xl text-center text-white leading-tight mt-4">
            {notFoundMessage}
          </h1>
          <p className="font-extrabold text-8xl my-28 text-white animate-bounce">
            404
          </p>
          <Link
            to={path}
            className="text-2xl lg:text-3xl text-center text-white leading-tight my-4 text-blue-500 underline hover:text-blue-700"
          >
            {navLinkMessage}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
