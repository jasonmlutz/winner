import React from "react";

const ConfirmationModal = ({
  modalVisible = false,
  setModalVisible,
  message,
}) => {
  return (
    <div className={"" + (modalVisible ? " block" : " hidden")}>
      <div className="z-30 absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute z-40 inset-0 shadow-lg border rounded-2xl p-4 bg-gray-800 w-[260px] md:w-1/2 lg:w-1/3 h-[300px] m-auto">
        <div className="w-full h-full text-center">
          <div className="flex h-full flex-col justify-between">
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
