import React, { createRef, useState } from "react";

import Header from "./Header";
import ScrollToTopButton from "./resources/ScrollToTopButton";

const Layout = ({ children, classes = "" }) => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  function handleScroll(e) {
    setShowScrollTopButton(e.target.scrollTop > 300);
    setHideHeader(e.target.scrollTop > 300);
  }

  const ref = createRef();

  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://raw.githubusercontent.com/Charlie85270/tail-kit/main/public/images/landscape/5.svg"
        className="absolute h-full w-full object-cover"
      />
      <Header hideHeader={hideHeader} />
      <ScrollToTopButton visible={showScrollTopButton} ref={ref} />
      <div
        ref={ref}
        className={"relative py-[74px] h-screen overflow-auto" + classes}
        onScroll={(e) => handleScroll(e)}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
