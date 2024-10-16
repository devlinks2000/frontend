import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/input";

// Wrapper component to use the useForm hook
const FormInputWrapper = (props) => {
  const { control } = useForm(); // useForm hook is called inside a React component
  return (
    <FormInput
      control={control}
      errors={{}}
      name="testInput"
      label="Test Input"
      {...props}
    />
  );
};

const renderFormInput = (props = {}) => {
  return render(<FormInputWrapper {...props} />);
};

describe("FormInput", () => {
  it("renders with the correct label", () => {
    renderFormInput();
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  it("displays an error message when there is an error", () => {
    renderFormInput({ errors: { testInput: { message: "Error message" } } });
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  it("is disabled when the disabled prop is true", () => {
    renderFormInput({ disabled: true });
    expect(screen.getByLabelText(/test input/i)).toBeDisabled();
  });
});
