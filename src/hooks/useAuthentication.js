import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useAuthentication = () => {
  const user = useSelector((state) => state.auth);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    //console.log(user.);
    if (user.accessToken !== "") {
      return () => {
        setIsLogged(true);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return isLogged;
};

export default useAuthentication;
