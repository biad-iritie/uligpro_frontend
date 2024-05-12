// components
import PageHeader from "@layout/PageHeader";
import AppGrid from "@layout/AppGrid";
import AccountSettings from "@widgets/AccountSettings";
import ChangePassword from "@widgets/ChangePassword";
import MyTicket from "@widgets/MyTicket";
import ProfileInfo from "@widgets/ProfileInfo";
import { useDispatch } from "react-redux";
import { setStatusToIdle } from "./../features/event/eventSlide";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const widgets = {
  /* avatar: <ProfileAvatar />, */
  info: <ProfileInfo />,
  ticket: <MyTicket />,
  settings: <AccountSettings />,
  password: <ChangePassword />,
};

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user]);
  useDispatch(setStatusToIdle);
  return (
    <>
      <PageHeader title="Profile" />
      <AppGrid id="myprofile" widgets={widgets} />
    </>
  );
};

export default MyProfile;
