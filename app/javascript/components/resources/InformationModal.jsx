import React from "react";

const ConfirmationModal = ({
  modalVisible = false,
  setModalVisible,
  message,
  type = "check",
}) => {
  const renderCaution = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="h-12 w-12 mt-4 m-auto text-orange-600"
      viewBox="0 0 1792 1792"
    >
      <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"></path>
    </svg>
  );

  const renderCheck = (
    <svg
      className="h-12 w-12 mt-4 m-auto text-green-500"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );

  const renderIcon = () => {
    switch (type) {
      case "caution":
        return renderCaution;
      case "check":
        return renderCheck;
      default:
        break;
    }
  };

  return (
    <div className={"" + (modalVisible ? " block" : " hidden")}>
      <div className="z-30 absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute z-40 inset-0 shadow-lg border rounded-2xl p-4 bg-gray-800 w-[260px] md:w-1/2 lg:w-1/3 h-[300px] m-auto">
        <div className="w-full h-full text-center">
          <div className="flex h-full flex-col justify-between">
            {renderIcon()}
            <p className="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
              {message}
            </p>
            <div className="flex items-center justify-between gap-4 w-full mt-8">
              <button
                type="button"
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
