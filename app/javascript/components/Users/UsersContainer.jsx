import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NewUserForm from "./NewUserForm";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      if (!data) {
        window.alert(`No users found!`);
        return;
      }

      setUsers(data);
    }

    fetchData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const renderUsersContainer = () => {
    if (users.length) {
      return (
        <>
          <div className="text__title--medium">Existing users</div>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="text__icon"
                onClick={() => {
                  navigate(`/users/${user.id.toString()}`);
                }}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return <div className="heading">No users!</div>;
    }
  };

  return (
    <div className="UsersContainer">
      {renderUsersContainer()}
      <NewUserForm />
    </div>
  );
};

export default UsersContainer;
