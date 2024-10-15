import { Bounce, toast } from "react-toastify";

export const successAlert = (message: string) => {
  return toast.success(message, {
    position: "bottom-center",
    autoClose: 5000,
    theme: "colored",
    transition: Bounce,
  });
};

export const errorAlert = (message: string) => {
  return toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    theme: "colored",
    transition: Bounce,
  });
};

export const infoAlert = (message: string) => {
  return toast.info(message, {
    position: "bottom-center",
    autoClose: 5000,
    theme: "colored",
    transition: Bounce,
  });
};
