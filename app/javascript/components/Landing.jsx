import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
        className="absolute h-full w-full object-cover"
      />
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
          <span className="font-bold uppercase text-yellow-400">Winner!</span>
          <h1 className="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4">
            Create surveys,
            <br />
            pick a winner
          </h1>
          <Link
            to="/auth"
            className="block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
