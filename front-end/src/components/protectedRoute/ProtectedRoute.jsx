import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ProtectedRoute({ children }) {

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    if (!cookies.access_token) {
        navigate('/login', { replace: true });
    }
  }, [navigate,cookies]);

  return children;
}
