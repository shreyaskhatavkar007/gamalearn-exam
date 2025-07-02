import { useNavigate } from "react-router-dom";

function useAuthenticated() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return {
    isAuthenticated: !!localStorage.getItem("token"),
    logout: logout,
  };
}

export default useAuthenticated;