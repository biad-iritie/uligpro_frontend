import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useAuthentication = () => {
  const user = useSelector((state) => state.auth.user);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    console.log("Authen");
    if (user.name !== undefined) {
      return () => {
        setIsLogged(true);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return isLogged;
};

export default useAuthentication;
