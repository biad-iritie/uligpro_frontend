import AppGrid from "@layout/AppGrid";

import PageHeader from "@layout/PageHeader";
import Matches from "@widgets/Matches";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { getLoggedUser } from "./../features/user/userSlice";
const LOGGED_USER = gql`
  query GetLoggedInUser {
    getLoggedInUser {
      user {
        name
        email
        tel
      }
      accessToken
      refreshToken
      error {
        code
        message
      }
    }
  }
`;

const widgets = {
  matches: <Matches />,
};
const Home1 = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [loggedUser] = useLazyQuery(LOGGED_USER);

  const getCredentials = async () => {
    try {
      await dispatch(
        getLoggedUser({
          loggedUserFunc: loggedUser,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accessToken === "") {
      getCredentials();
    }
  }, [accessToken]);
  return (
    <>
      <PageHeader title="Bienvenue" />
      <AppGrid id="bienvenue" widgets={widgets} />
    </>
  );
};

export default Home1;
