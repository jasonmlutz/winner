import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NewResponseOptionForm from "./NewResponseOptionForm";
import ResponseOptionDisplay from "./ResponseOptionDisplay";

const ResponseOptionsContainer = ({ parent_id, grandparent_id }) => {
  const [responseOptions, setResponseOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/questions/${parent_id}/response_options`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`no response options found!`);
        return;
      }

      setResponseOptions(data);
    }

    fetchData();
    return;
  }, [navigate]);

  if (responseOptions.length) {
    const sortedResponseOptions = responseOptions.sort(
      (a, b) => a.position - b.position
    );
    return (
      <div className="w-full flex flex-column justify-start w-full bg-gray-500 text-gray-100 rounded-md my-4 p-2">
        <ul className="w-full">
          {sortedResponseOptions.map((responseOption) => (
            <li className="py-1 md:py-2 mx-1 md:mx-2" key={responseOption.id}>
              <ResponseOptionDisplay
                responseOption={responseOption}
                responseOptions={responseOptions}
              />
            </li>
          ))}
          <li className="py-1 md:py-2 mx-1 md:mx-2">
            <NewResponseOptionForm
              parent_id={parent_id}
              grandparent_id={grandparent_id}
              siblingCount={responseOptions.length}
            />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-column justify-start w-full bg-gray-500 text-gray-100 rounded-md my-4 p-2">
        <ul className="w-full">
          <li className="py-1 md:py-2 mx-1 md:mx-2">
            <NewResponseOptionForm
              parent_id={parent_id}
              grandparent_id={grandparent_id}
              siblingCount={responseOptions.length}
            />
          </li>
        </ul>
      </div>
    );
  }
};

export default ResponseOptionsContainer;
