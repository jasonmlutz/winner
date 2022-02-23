import React from "react";

const ConfirmationModal = ({
  deleteCallback,
  modalVisible = false,
  setModalVisible,
}) => {
  return (
    <div className={"" + (modalVisible ? " block" : " hidden")}>
      <div className="z-30 absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute z-40 inset-0 shadow-lg border rounded-2xl p-4 bg-gray-800 w-[260px] md:w-1/2 lg:w-1/3 h-[300px] m-auto">
        <div className="w-full h-full text-center">
          <div className="flex h-full flex-col justify-between">
            <svg
              width="40"
              height="40"
              className="mt-4 w-12 h-12 m-auto text-indigo-500"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
            </svg>
            <p className="text-gray-200 text-xl font-bold mt-4">
              Are you sure you want to delete this survey?
            </p>
            <p className="text-gray-400 text-s py-2 px-6">
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-between gap-4 w-full mt-8">
              <button
                type="button"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                onClick={deleteCallback}
              >
                Delete
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
