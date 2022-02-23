import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetData } from "react-helmet-async";

import Layout from "../Layout";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);

  const helmetData = new HelmetData({});

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
  }, [navigate]);

  return (
    <Layout>
      <Helmet helmetData={helmetData}>
        <title>Users - Winner</title>
      </Helmet>
      <div className="mx-auto w-full">
        <div className="pb-24 md:pt-12 px-2 md:px-6 flex flex-col items-center">
          <ul className="flex flex-col w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
            {users.map((user) => (
              <li key={user.id} className="border-gray-100 flex flex-row mb-2">
                <Link className="w-full" to={`/users/${user.id}`}>
                  <div className="w-full transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-700 select-none bg-gray-800 rounded-md p-4">
                    <div className="px-1 flex flex-col">
                      <div className="font-medium text-white">{user.name}</div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default UsersContainer;
