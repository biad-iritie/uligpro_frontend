import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useAuthentication = () => {
  const user = useSelector((state) => state.user);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (user.Refreshtoken) {
      return () => {
        setIsLogged(true);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  console.log(isLogged);
  return isLogged;
};

export default useAuthentication;
