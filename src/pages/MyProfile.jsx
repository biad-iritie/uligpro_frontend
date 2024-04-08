// components
import PageHeader from "@layout/PageHeader";
import AppGrid from "@layout/AppGrid";
import AccountSettings from "@widgets/AccountSettings";
import ChangePassword from "@widgets/ChangePassword";
import MyTicket from "@widgets/MyTicket";
import { useDispatch } from "react-redux";
import { setStatusToIdle } from "./../features/event/eventSlide";

const widgets = {
  /* avatar: <ProfileAvatar />, */
  //info: <ProfileInfo />,
  ticket: <MyTicket />,
  settings: <AccountSettings />,
  password: <ChangePassword />,
};

const MyProfile = () => {
  useDispatch(setStatusToIdle);
  return (
    <>
      <PageHeader title="Profile" />
      <AppGrid id="myprofile" widgets={widgets} />
    </>
  );
};

export default MyProfile;
