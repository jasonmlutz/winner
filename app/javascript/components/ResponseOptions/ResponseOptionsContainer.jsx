import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import NewResponseOptionForm from "./NewResponseOptionForm";
import ResponseOptionDisplay from "./ResponseOptionDisplay";

const ResponseOptionsContainer = ({ parent_id, grandparent_id }) => {
  const [responseOptions, setResponseOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/v1/questions/${parent_id}/response_options`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const renderResponseOptionsContainer = () => {
    if (responseOptions.length) {
      const sortedResponseOptions = responseOptions.sort(
        (a, b) => a.position - b.position
      );
      return (
        <>
          <ul>
            {sortedResponseOptions.map((responseOption) => (
              <li key={responseOption.id}>
                <ResponseOptionDisplay
                  responseOption={responseOption}
                  responseOptions={responseOptions}
                />
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <div className="ResponseOptionsContainer">
      {renderResponseOptionsContainer()}
      <NewResponseOptionForm
        parent_id={parent_id}
        grandparent_id={grandparent_id}
        siblingCount={responseOptions.length}
      />
    </div>
  );
};

export default ResponseOptionsContainer;
