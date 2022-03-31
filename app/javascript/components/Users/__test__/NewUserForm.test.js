/**
 * @jest-environment jsdom
 */
// IMPORT react
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// IMPORT components
import { NewUserForm } from "../NewUserForm";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
// Needed to spy on an imported function
import * as moduleNewUserForm from "../NewUserForm";

// IMPORT test utilities
import { act } from "react-dom/test-utils";
// see https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
import { screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { toBeDisabled } from "@testing-library/jest-dom";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

// IMPORT misc
import "@babel/polyfill"; // for regeneratorRuntime

// GLOBAL setup
let container;
beforeEach(() => {
  jest.clearAllTimers(); // without this, timers started by changing username will continue to run into other tests
  jest.clearAllMocks();
  jest.useRealTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    createRoot(container).render(
      <BrowserRouter>
        <CurrentUserProvider>
          <NewUserForm />
        </CurrentUserProvider>
      </BrowserRouter>
    );
  });
});
// GLOBAL teardown
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("STATIC TESTS", () => {
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

  describe("displays correct content and messaging", () => {
    test("create a new account", () => {
      expect(screen.getByText(/^create a new account$/i));
    });
    test("already have an account?", () => {
      expect(screen.getByText(/^already have an account?/i));
    });
    test("link to login form", () => {
      expect(
        screen.getByRole("link", {
          name: /^sign in$/i,
        })
      );
    });
  });

  describe("displays correct buttons", () => {
    test("register button is present", () => {
      expect(
        screen.getByRole("button", {
          name: /^register$/i,
        })
      );
    });
    test("register button is disabled", () => {
      expect(
        screen.getByRole("button", {
          name: /^register$/i,
        })
      ).toBeDisabled();
    });
    test("browse as guest button is present", () => {
      expect(screen.getByRole("link", { name: /^browse surveys as guest$/i }));
    });
  });

  describe("input fields are present", () => {
    test("username input", () => {
      expect(screen.getByPlaceholderText(/^name$/i));
    });
    test("password input", () => {
      expect(screen.getByPlaceholderText(/^password$/i));
    });
    test("confirm password input", () => {
      expect(screen.getByPlaceholderText(/^confirm password$/i));
    });
  });

  describe("validation display messages are absent", () => {
    test("username availability", () => {
      expect(screen.queryByText(/available/i)).toBeNull();
    });
    test("password agreement", () => {
      expect(screen.queryByText(/do not match/i)).toBeNull();
    });
  });
});

describe("DYNAMIC TESTS", () => {
  describe("password fields", () => {
    let passwordField, passwordConfirmField;
    beforeEach(() => {
      passwordField = screen.getByPlaceholderText(/^password$/i);
      passwordConfirmField = screen.getByPlaceholderText(/^confirm password$/i);
    });
    test("password fields accept input", () => {
      act(() => {
        fireEvent.change(passwordField, { target: { value: "firstPassword" } });
        fireEvent.change(passwordConfirmField, {
          target: { value: "secondPassword" },
        });
      });
      expect(passwordField.value).toBe("firstPassword");
      expect(passwordConfirmField.value).toBe("secondPassword");
    });
    test.todo(
      "passwords are not shown in plaintext"
      // they are not shown, but not because they are passwords; see username below
    );
    describe("password validation", () => {
      test("non-empty, non-matching passwords reveal warning message", () => {
        act(() => {
          fireEvent.change(passwordField, { target: { value: "password" } });
          fireEvent.change(passwordConfirmField, {
            target: { value: "differentPassword" },
          });
        });
        expect(screen.queryByText(/do not match/i)).not.toBeNull();
      });
      test("matching passwords do not reveal warning message", () => {
        act(() => {
          fireEvent.change(passwordField, { target: { value: "password" } });
          fireEvent.change(passwordConfirmField, {
            target: { value: "password" },
          });
        });
        expect(screen.queryByText(/do not match/i)).toBeNull();
      });
      test("warning message not shown when only password is blank", () => {
        act(() => {
          fireEvent.change(passwordField, { target: { value: "" } });
          fireEvent.change(passwordConfirmField, {
            target: { value: "password" },
          });
        });
        expect(screen.queryByText(/do not match/i)).toBeNull();
      });
      test("warning message not shown when only password confirmation is blank", () => {
        act(() => {
          fireEvent.change(passwordField, { target: { value: "password" } });
          fireEvent.change(passwordConfirmField, {
            target: { value: "" },
          });
        });
        expect(screen.queryByText(/do not match/i)).toBeNull();
      });
    });
  });
  describe("username field", () => {
    let nameInput;
    beforeEach(() => {
      nameInput = screen.getByPlaceholderText(/name/i);
    });
    test("username field accepts input", () => {
      act(() => {
        fireEvent.change(nameInput, { target: { value: "userName" } });
      });
      expect(nameInput.value).toBe("userName");
    });
    test.todo(
      "username is displayed in plaintext"
      // the text is accessible as DisplayValue, but so is password text ...
    );
    describe("username validation", () => {
      test("username input triggers 1 setTimeout(_, 1000) call", () => {
        jest.spyOn(global, "setTimeout");
        act(() => {
          fireEvent.change(nameInput, { target: { value: "userName" } });
        });
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      });
      test("username input triggers checkAvailability API call after 1000ms", async () => {
        jest.spyOn(moduleNewUserForm, "checkAvailability");
        enableFetchMocks();
        fetchMock.mockResponseOnce(JSON.stringify({ foo: "bar" }));
        act(() => {
          fireEvent.change(nameInput, { target: { value: "userName" } });
        });
        // `ReferenceError: regeneratorRuntime is not defined` thrown if @babel/polyfill not included
        // `ReferenceError: fetch is not defined` thrown without fetchMock & enableFetchMocks
        // checkAvailability is async, so it must resolve in order to have been "called"
        await expect(moduleNewUserForm.checkAvailability()).resolves.toBe(
          undefined
        );
        // TODO it's not clear that the expect is actually catching what we want; i.e. is it just catching the resolves above?
        expect(moduleNewUserForm.checkAvailability).toHaveBeenCalledTimes(1);
      });
      test("username available message is correctly displayed", () => {
        fetchMock.mockResponseOnce(JSON.stringify({ name_available: true }));
        act(() => {
          fireEvent.change(nameInput, { target: { value: "userName" } });
        });
      });
      test("username unavailable message is correctly displayed", () => {
        fetchMock.mockResponseOnce(JSON.stringify({ name_available: false }));
        act(() => {
          fireEvent.change(nameInput, {
            target: { value: "userName" },
          });
        });
      });
    });
  });
});
