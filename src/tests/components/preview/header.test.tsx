import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PreviewHeader from "../../../components/preview/header";

jest.mock("../../../context/link", () => ({
  useLinks: () => ({
    getValues: jest.fn().mockReturnValue("test-id"),
  }),
}));

jest.mock("../../../utils/alertMessage", () => ({
  infoAlert: jest.fn(),
}));

describe("PreviewHeader", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <PreviewHeader />
      </MemoryRouter>
    );
    expect(getByText(/Back to Editor/i)).toBeInTheDocument();
    expect(getByText(/Share Link/i)).toBeInTheDocument();
  });

  it("navigates back to editor on button click", () => {
    const { getByText } = render(
      <MemoryRouter>
        <PreviewHeader />
      </MemoryRouter>
    );
    fireEvent.click(getByText(/Back to Editor/i));
  });
});
