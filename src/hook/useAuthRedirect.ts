import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("IdToken");

    if (idToken) {
      navigate("/links");
    }
  }, [navigate]);
};

export default useAuthRedirect;
