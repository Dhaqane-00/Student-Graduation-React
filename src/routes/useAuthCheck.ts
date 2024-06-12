import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    console.log(userData);
    if (!userData) {
      navigate('/');
    }
  }, [navigate]);
};

export default useAuthCheck;
