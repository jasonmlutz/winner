/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";

import renderer from "react-test-renderer";

import NewUserForm from "../NewUserForm";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

it("renders correctly from snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CurrentUserProvider>
          <NewUserForm />
        </CurrentUserProvider>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
