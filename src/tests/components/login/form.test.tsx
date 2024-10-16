import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../../components/login/form";
import AuthenticationService from "../../../services/auth";
import { setStorage } from "../../../utils/localstorage";
import { successAlert, errorAlert } from "../../../utils/alertMessage";

jest.mock("../../../services/auth", () => ({
  login: jest.fn(),
}));
jest.mock("../../../utils/localstorage");
jest.mock("../../../utils/alertMessage");

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    (AuthenticationService.login as any).mockResolvedValue({
      IdToken: "id-token",
      RefreshToken: "refresh-token",
      AccessToken: "access-token",
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(AuthenticationService.login).toHaveBeenCalledWith({
        username: "test@example.com",
        password: "password",
      });
      expect(setStorage).toHaveBeenCalledWith("IdToken", "id-token");
      expect(setStorage).toHaveBeenCalledWith("RefreshToken", "refresh-token");
      expect(setStorage).toHaveBeenCalledWith("AccessToken", "access-token");
      expect(successAlert).toHaveBeenCalledWith("Login successful.");
    });
  });

  it("handles login error", async () => {
    (AuthenticationService.login as any).mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(errorAlert).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
