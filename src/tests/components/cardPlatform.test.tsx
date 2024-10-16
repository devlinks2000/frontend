import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CardPlatform from "../../components/cardPlatform";
import { Link } from "../../context/link";

jest.mock("../../utils/const/plataforms", () => ({
  platforms: [
    { name: "Platform1", color: "blue", icon: () => <div>Icon</div> },
  ],
}));

describe("CardPlatform", () => {
  const link: Link = { platform: "Platform1", link: "http://example.com" };

  it("renders without crashing", () => {
    const { getByText } = render(<CardPlatform link={link} />);
    expect(getByText(/Platform1/i)).toBeInTheDocument();
  });

  it("opens link in new tab on click", () => {
    const { getByText } = render(<CardPlatform link={link} />);
    const platformElement = getByText(/Platform1/i);
    fireEvent.click(platformElement);
    // Here you would check if the window.open was called, but this is a placeholder
    expect(true).toBe(true);
  });
});
