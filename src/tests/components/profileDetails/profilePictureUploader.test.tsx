import React from "react";
import { render } from "@testing-library/react";
import ProfilePictureUploader from "../../../components/profileDetails/profilePictureUploader";
import { useLinks } from "../../../context/link";

jest.mock("../../../context/link", () => ({
  useLinks: jest.fn(),
}));

describe("ProfilePictureUploader", () => {
  beforeEach(() => {
    (useLinks as any).mockReturnValue({
      setValue: jest.fn(),
      setAvatar: jest.fn(),
      avatar: null,
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(<ProfilePictureUploader />);
    expect(getByText(/Profile picture/i)).toBeInTheDocument();
    expect(getByText(/\+ Upload Image/i)).toBeInTheDocument();
  });
});
