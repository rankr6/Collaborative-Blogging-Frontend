/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {SignupForm} from "../src/pages/signup/SignupForm";

describe("SignupForm Component", () => {
  test("renders form step 1 correctly", () => {
    const { getByText, getByPlaceholderText } = render(<SignupForm />);
    expect(getByText("Create an account")).toBeInTheDocument();
    expect(getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Last Name")).toBeInTheDocument();
  });

  test("renders form step 2 correctly", async () => {
    const { getByText, getByPlaceholderText } = render(<SignupForm />);
    fireEvent.click(getByText("Next"));
    await waitFor(() => {
      expect(getByPlaceholderText("Username")).toBeInTheDocument();
      expect(getByPlaceholderText("Email")).toBeInTheDocument();
    });
  });

  test("renders form step 3 correctly", async () => {
    const { getByText, getByPlaceholderText } = render(<SignupForm />);
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    await waitFor(() => {
      expect(getByPlaceholderText("Mobile Number")).toBeInTheDocument();
      expect(getByPlaceholderText("Password")).toBeInTheDocument();
    });
  });

  test("submitting form should call onSubmit function", async () => {
    const onSubmitMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SignupForm />);
    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Next"));
    fireEvent.change(getByPlaceholderText("Mobile Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.click(getByText("Create an account"));
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  // Add more tests for edge cases, validation, etc.
});
