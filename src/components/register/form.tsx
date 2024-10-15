import { registerSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import FormInput from "../form/input";
import { FaEnvelopeOpenText, FaLock, FaUser } from "react-icons/fa";
import SubmitButton from "../form/submitButton";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "./../../services/auth";
import _ from "lodash";
import { useState } from "react"; // Add this import
import { setStorage } from "../../utils/localstorage";
import { errorAlert, successAlert } from "../../utils/alertMessage";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true); // Set loading to true
    try {
      const user = await AuthenticationService.createUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setStorage("IdToken", _.get(user, "IdToken"));
      setStorage("RefreshToken", _.get(user, "RefreshToken"));
      setStorage("AccessToken", _.get(user, "AccessToken"));

      const message = _.get(user, "message", "User created.");
      successAlert(message);
      navigate("/");
    } catch (error) {
      console.error(error);

      const errorMessage = _.get(
        error,
        "response.data.message",
        "Error to create a new user."
      );
      errorAlert(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after the operation
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%" }}
      >
        <FormInput
          name="email"
          control={control}
          errors={errors}
          Icon={<FaEnvelopeOpenText />}
          label={"Email address"}
        />
        <FormInput
          name="username"
          control={control}
          Icon={<FaUser />} // Assuming the same icon for username as email for demonstration
          errors={errors}
          label={"User Name"}
          placeholder="Enter your user name"
        />
        <FormInput
          name="password"
          control={control}
          errors={errors}
          Icon={<FaLock />}
          label={"Password"}
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
        <FormInput
          name="confirmPassword"
          control={control}
          errors={errors}
          Icon={<FaLock />}
          label={"Confirm password"}
          type="password"
          autoComplete="current-password"
          placeholder="Confirm your password"
        />
        <SubmitButton
          text={loading ? "Creating..." : "Create new account"}
          disabled={loading}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#633CFF",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
