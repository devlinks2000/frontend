import React from "react";
import { render } from "@testing-library/react";
import CardContentView from "../../../components/preview/cardContent";

describe("CardContentView", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <CardContentView
        avatarUrl="https://via.placeholder.com/150"
        name="John Doe"
        email="john.doe@example.com"
        links={[
          { platform: "facebook", link: "https://facebook.com/johndoe" },
          { platform: "twitter", link: "https://twitter.com/johndoe" },
        ]}
      />
    );
    expect(getByText(/John Doe/i)).toBeInTheDocument();
    expect(getByText(/john.doe@example.com/i)).toBeInTheDocument();
  });

  it("renders links correctly", () => {
    const { getByText } = render(
      <CardContentView
        avatarUrl="https://via.placeholder.com/150"
        name="John Doe"
        email="john.doe@example.com"
        links={[
          { platform: "Facebook", link: "https://facebook.com/johndoe" },
          { platform: "Twitter", link: "https://twitter.com/johndoe" },
        ]}
      />
    );
    expect(getByText(/Facebook/i)).toBeInTheDocument();
    expect(getByText(/Twitter/i)).toBeInTheDocument();
  });
});
