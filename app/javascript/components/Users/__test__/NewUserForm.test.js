import renderer from "react-test-renderer";
import React from "react";
import NewUserForm from "../NewUserForm";

it("renders correctly", () => {
  const tree = renderer.create(<NewUserForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
