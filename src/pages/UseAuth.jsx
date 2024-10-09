import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from "../Context";

const useAuth = async (onAuthChecked) => {
  const navigate = useNavigate();
  const { CheckToken,staff } = useGlobalContext();

  useEffect(() => {
    const authenticate = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        onAuthChecked();
      } else {
        try {
          if(staff.Staff_id === -1){
            await CheckToken(token);
          }
          onAuthChecked();
        } catch (error) {
          console.error("Token check failed", error);
          navigate("/");
        }
      }
    };

    authenticate();
  }, [navigate, CheckToken,onAuthChecked]);
};

export default useAuth;
