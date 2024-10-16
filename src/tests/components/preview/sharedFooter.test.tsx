import React from "react";
import { render } from "@testing-library/react";
import SharedFooter from "../../../components/preview/sharedFooter";

describe("SharedFooter", () => {
  it("renders without crashing", () => {
    const { getByLabelText } = render(<SharedFooter id="test-id" />);

    expect(getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(getByLabelText(/reddit/i)).toBeInTheDocument();
    expect(getByLabelText(/linkedin/i)).toBeInTheDocument();
  });
});
