import { useState, useEffect } from 'react';

export default function UseAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState(null);

  const fetchAuth = () => {
    const profile = JSON.parse(localStorage.getItem('profile'));

    if (profile) {
      setIsAuth(true);
      setData(profile);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);
  return { isAuth, data, fetchAuth };
}
